<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SocialController extends Controller {
    public function follow(Request $request, string $handle) {
        $sourceUser = $request->user();
        $targetUser = User::where('handle', $handle)->firstOrFail();

        $sourceUser->follow($targetUser);

        return redirect()->back();
    }

    public function unfollow(Request $request, string $handle) {
        $sourceUser = $request->user();
        $targetUser = User::where('handle', $handle)->firstOrFail();

        $sourceUser->unfollow($targetUser);

        return redirect()->back();
    }
}
