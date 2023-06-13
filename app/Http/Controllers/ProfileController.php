<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use App\Models\JournalEntry;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Image;

class ProfileController extends Controller
{
    /**
     * Uploads a file to S3 and returns the URL.
     * @param \Illuminate\Http\UploadedFile $file The file to upload.
     * @param string $path The path to upload the file to.
     * @param array<int, int> $dimensions The dimensions to resize the image to.
     * @return string The URL of the uploaded file.
     */
    private function _upload_file_to_s3($file, $path, $dimensions)
    {
        $uuid = Str::orderedUuid();
        $extension = $file->getClientOriginalExtension();
        $full_filename = $uuid . '.' . $extension;

        $image = Image::make($file);
        $image->fit($dimensions[0], $dimensions[1]);
        $resource = $image->stream()->detach();

        Storage::disk('s3')->put($path . '/' . $full_filename, $resource);

        return Env::get('AWS_URL') . '/' . $path . '/' . $full_filename;
    }

    /**
     * Show a user's profile by their handle.
     * @param \Illuminate\Http\Request $request The request object.
     * @param string $handle The user's handle. This is the @username.
     * @return \Inertia\Response
     */
    public function show(Request $request, string $handle)
    {
        $user = User::where('handle', $handle)->firstOrFail();

        return Inertia::render('profile/show', [
            'user' => $user,
            'social' => [
                "followers_count" => $user->followers()->count(),
                "followings_count" => $user->followings()->where('followable_type', "App\\Models\\User")->count(),
                "is_following" => auth()->user() ? auth()->user()->isFollowing($user) : false,
                "followers" => $user->followers()
                    ->with('followers')
                    ->paginate(12, pageName: 'followers')
                    ->through(function ($follower) {
                        return [
                            'id' => $follower->id,
                            'name' => $follower->name,
                            'handle' => $follower->handle,
                            'avatar' => $follower->avatar,
                            'is_following' => auth()->user() ? auth()->user()->isFollowing($follower) : false,
                        ];
                    }),
                "followings" => $user->followings()
                    ->where('followable_type', "App\\Models\\User")
                    ->with('followable')
                    ->paginate(12, pageName: 'followings')
                    ->through(function ($following) {
                        return [
                            'id' => $following->followable->id,
                            'name' => $following->followable->name,
                            'handle' => $following->followable->handle,
                            'avatar' => $following->followable->avatar,
                            'is_following' => auth()->user() ? auth()->user()->isFollowing($following->followable) : false,
                        ];
                    }),
            ]
        ]);
    }

    /**
     * Update a user's profile. This is the POST route.
     * @param \Illuminate\Http\Request $request The request object.
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'bio' => ['required', 'string', 'max:255'],
            'avatar' => ['nullable', 'image'],
        ]);

        $user->name = $request->name;
        $user->bio = $request->bio;

        // TODO: Optionally, we can create multiple sizes of the image by
        //       adding a queue job here. But we probably don't want this.
        if ($request->hasFile('avatar')) {
            $uploaded_file = $this->_upload_file_to_s3($request->file('avatar'), 'avatars', [400, 400]);

            if ($user->avatar) {
                $filename = basename($user->avatar);
                Storage::disk('s3')->delete('avatars/' . $filename);
            }

            $user->avatar = $uploaded_file;
        }

        if ($request->hasFile('cover_image')) {
            $uploaded_file = $this->_upload_file_to_s3($request->file('cover_image'), 'cover_images', [1500, 500]);

            if ($user->cover_image) {
                $filename = basename($user->cover_image);
                Storage::disk('s3')->delete('cover_images/' . $filename);
            }

            $user->cover_image = $uploaded_file;
        }

        $user->save();

        return to_route('profile.show', ['handle' => $user->handle]);
    }

    public function entries(Request $request, string $handle)
    {
        $user = User::where('handle', $handle)->firstOrFail();
        return JournalEntry::where('user_id', $user->id)
            ->where('is_public', true)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'excerpt', 'created_at', 'updated_at', 'is_public', 'user_id', 'journal_id')
            ->with(['user' => function ($query) {
                $query->select('id', 'name', 'handle', 'avatar');
            }, 'journal' => function ($query) {
                $query->select('id', 'slug');
            }])
            ->withCount('likers')
            ->paginate(12)
            ->through(function ($entry) {
                return [
                    'id' => $entry->id,
                    'name' => $entry->name,
                    'slug' => $entry->slug,
                    'excerpt' => $entry->excerpt,
                    'created_at' => $entry->created_at,
                    'updated_at' => $entry->updated_at,
                    'is_public' => $entry->is_public,
                    'likers_count' => $entry->likers_count,
                    'has_liked' => auth()->user() ? auth()->user()->hasLiked($entry) : false,
                    'user' => [
                        'id' => $entry->user->id,
                        'name' => $entry->user->name,
                        'handle' => $entry->user->handle,
                        'avatar' => $entry->user->avatar,
                    ],
                    'journal' => [
                        'id' => $entry->journal->id,
                        'slug' => $entry->journal->slug,
                    ]
                ];
            });
    }

    public function journals(Request $request, string $handle)
    {
        $user = User::where('handle', $handle)->firstOrFail();
        return Journal::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'description', 'created_at', 'updated_at')
            ->withCount(['entries' => function ($query) {
                $query->where('is_public', true);
            }])
            ->withCount('followers')
            ->paginate(12);
    }
}
