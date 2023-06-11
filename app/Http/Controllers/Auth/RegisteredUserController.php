<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function index(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'handle' => 'required|string|alpha:ascii|lowercase|max:255|unique:' . User::class,
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'handle' => $request->handle,
            'email' => $request->email,
            'password' => Hash::make($request->password),

            'name' => $request->handle,
            'bio' => 'Hey! I\'m new here.',
            'avatar' => 'https://gravatar.com/avatar/' . md5(strtolower(trim($request->email))) . '?s=400',
            'cover_image' => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP89R8AAvkB+0p/ESEAAAAASUVORK5CYII=',
        ]);

        event(new Registered($user));

        Auth::login($user);

        /** TODO: Redirect to profile page e.g. /@{handle} */
        return redirect(RouteServiceProvider::HOME);
    }
}
