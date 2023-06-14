<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class JournalController extends Controller
{
    public function show(Journal $journal)
    {
        return Inertia::render('journal/show', [
            'journal' => [
                'id' => $journal->id,
                'name' => $journal->name,
                'slug' => $journal->slug,
                'description' => $journal->description,
                'user' => $journal->user()->get()[0],
                'entries_count' => $journal->entries()
                    ->where('is_public', true)
                    ->orWhere('user_id', auth()->id())
                    ->count(),
                'entries' => $journal->entries()
                    ->with(['user'])->withCount(['likers', 'comments'])
                    ->where('is_public', true)
                    ->orWhere('user_id', auth()->id())
                    ->paginate(12)->through(
                        function ($entry) {
                            return [
                                'id' => $entry->id,
                                'name' => $entry->name,
                                'slug' => $entry->slug,
                                'excerpt' => $entry->excerpt,
                                'created_at' => $entry->created_at,
                                'is_public' => $entry->is_public,
                                'user' => [
                                    'id' => $entry->user->id,
                                    'name' => $entry->user->name,
                                    'handle' => $entry->user->handle,
                                    'avatar' => $entry->user->avatar,
                                ],
                                'likers_count' => $entry->likers_count,
                                'comments_count' => $entry->comments_count,
                                'has_liked' => auth()->user() ? auth()->user()->hasLiked($entry) : false,
                            ];
                        }
                    )
            ],
            'social' => [
                "followers_count" => $journal->followers()->count(),
                "is_following" => auth()->user() ? auth()->user()->isFollowing($journal) : false,
                "followers" => $journal->followers()->with('followers')->paginate(12)->through(
                    function ($follower) {
                        return [
                            'id' => $follower->id,
                            'name' => $follower->name,
                            'handle' => $follower->handle,
                            'avatar' => $follower->avatar,
                            'is_following' => auth()->user() ? auth()->user()->isFollowing($follower) : false
                        ];
                    }
                )
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        $journal = new Journal;
        $journal->name = $request->name;
        $journal->description = $request->description;

        // We are adding a random string to the slug to avoid slug conflicts.
        // User can change the slug later.
        $journal->slug = Str::slug($request->name, '-') . '-' . Str::random(6);
        $journal->user_id = $request->user()->id;
        $journal->save();

        return to_route('journal.show', ['journal' => $journal]);
    }

    public function edit(Journal $journal)
    {
        return Inertia::render('journal/edit', [
            'journal' => $journal,
        ]);
    }

    public function update(Request $request, Journal $journal)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|alpha_dash|max:255|unique:journals,slug,' . $journal->id,
            'description' => 'required|string|max:255',
        ]);

        $journal->name = $request->name;
        $journal->slug = Str::slug($request->slug);
        $journal->description = $request->description;
        $journal->save();

        return to_route('journal.show', ['journal' => $journal]);
    }

    public function destroy(Journal $journal)
    {
        $journal->delete();
        return to_route('home');
    }
}
