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
      $file = $request->file('avatar');

      $uuid = Str::orderedUuid();
      $extension = $file->getClientOriginalExtension();
      $full_filename = $uuid . '.' . $extension;

      $image = Image::make($file);
      $image->fit(200, 200);

      $resource = $image->stream()->detach();
      Storage::disk('s3')->put('avatars/' . $full_filename, $resource);
      $user->avatar = Env::get('AWS_URL') . '/avatars/' . $full_filename;
    }

    $user->save();

    return to_route('profile.show', ['handle' => $user->handle]);
  }
}
