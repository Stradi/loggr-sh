<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::group([], function () {
  Route::get('@{handle}', [ProfileController::class, 'show'])->name('profile.show');
});
