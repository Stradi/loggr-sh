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

    if ($request->hasFile('avatar')) {
      // TODO: There may be a better way to do this

      $image = $request->file('avatar');
      $extension = pathinfo($image->getClientOriginalName(), PATHINFO_EXTENSION);

      $imageObj = Image::make($image->getRealPath());
      $imageObj->resize(500, 500, function ($constraint) {
        $constraint->aspectRatio();
      });

      $filename = Str::orderedUuid();
      $tmp = tempnam(sys_get_temp_dir(), $filename) . '.' . $extension;
      $imageObj->save($tmp);

      Log::info('Filename is ' . $filename);
      Log::info('Extension is ' . $extension);
      Log::info('Saved tmp file to ' . $tmp);
      Log::info('Upload URL is avatars/' . $filename . '.' . $extension);

      $url = Storage::disk('s3')->put('avatars/' . $filename . '.' . $extension, $imageObj, 'public');
      $user->avatar = Env::get('AWS_URL') . '/avatars/' . $filename . '.' . $extension;
    }

    $user->save();

    return to_route('profile.show', ['handle' => $user->handle]);
  }
}
