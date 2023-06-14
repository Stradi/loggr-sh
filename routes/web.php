<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('welcome', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::post('/upload-to-s3', function (Request $request) {
    $request->validate([
        // Max 10Mb
        'file' => 'required|mimes:png,jpg,jpeg,svg,webp|max:10000'
    ]);

    $uploaded_file = upload_file_to_s3($request->file('file'), 'uploads');

    return response()->json([
        "url" => $uploaded_file
    ]);
});

require __DIR__ . '/auth.php';
require __DIR__ . '/profile.php';
require __DIR__ . '/journal.php';
require __DIR__ . '/journalEntry.php';
