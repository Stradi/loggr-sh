<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProfileController extends Controller
{
  public function show(Request $request, string $handle)
  {
    $user = User::where('handle', $handle)->firstOrFail();

    return Inertia::render('profile/show', [
      'user' => $user,
    ]);
  }
}
