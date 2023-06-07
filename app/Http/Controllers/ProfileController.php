<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Image;

class ProfileController extends Controller
{
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

  public function show(Request $request, string $handle)
  {
    $user = User::where('handle', $handle)->firstOrFail();

    return Inertia::render('profile/show', [
      'user' => $user,
    ]);
  }

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
      $uploaded_file = $this->_upload_file_to_s3($request->file('avatar'), 'avatars', [256, 256]);

      if ($user->avatar) {
        $filename = basename($user->avatar);
        Storage::disk('s3')->delete('avatars/' . $filename);
      }

      $user->avatar = $uploaded_file;
    }

    if ($request->hasFile('cover_image')) {
      $uploaded_file = $this->_upload_file_to_s3($request->file('cover_image'), 'cover_images', [1024, 256]);

      if ($user->cover_image) {
        $filename = basename($user->cover_image);
        Storage::disk('s3')->delete('cover_images/' . $filename);
      }

      $user->cover_image = $uploaded_file;
    }

    $user->save();

    return to_route('profile.show', ['handle' => $user->handle]);
  }
}
