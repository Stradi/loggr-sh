<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocialController;
use Illuminate\Support\Facades\Route;

Route::group([], function () {
    Route::get('@{handle}', [ProfileController::class, 'show'])->name('profile.show');
    Route::post('@{handle}', [ProfileController::class, 'update'])->name('profile.update');

    Route::post('@{handle}/follow', [SocialController::class, 'follow'])
        ->name('social.follow')
        ->middleware(['auth', 'verified']);

    Route::post('@{handle}/unfollow', [SocialController::class, 'unfollow'])
        ->name('social.unfollow')
        ->middleware(['auth', 'verified']);

    Route::post('/j/{journal}/follow', [SocialController::class, 'followJournal'])
        ->name('social.follow_journal')
        ->middleware(['auth', 'verified']);

    Route::post('/j/{journal}/unfollow', [SocialController::class, 'unfollowJournal'])
        ->name('social.unfollow_journal')
        ->middleware(['auth', 'verified']);

    Route::get('@{handle}/entries', [ProfileController::class, 'entries'])
        ->name('profile.entries');

    Route::get('@{handle}/journals', [ProfileController::class, 'journals'])
        ->name('profile.journals');

    Route::post('/j/{journal}/{journalEntry}/like', [SocialController::class, 'likeJournalEntry'])
        ->name('social.like_journal_entry')
        ->middleware(['auth', 'verified']);

    Route::post('/j/{journal}/{journalEntry}/unlike', [SocialController::class, 'unlikeJournalEntry'])
        ->name('social.unlike_journal_entry')
        ->middleware(['auth', 'verified']);
});
