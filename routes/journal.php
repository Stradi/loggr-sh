<?php

use App\Http\Controllers\JournalController;
use Illuminate\Support\Facades\Route;

// These journal routes are prefixed with "/j" to make URLs more cool.
// Also we are using implicit model binding to get the journal by its slug.
// This is done by adding the "getRouteKeyName" method to the Journal model.

Route::group([], function () {
    // Shows a journal by its slug. Accessible to *everyone*.
    Route::get('/j/{journal}', [JournalController::class, 'show'])->name('journal.show');

    // Creates a new journal. Accessible to *authenticated* users only.
    // We don't need a GET (create) route because we're using a modal to create a new journal.
    // TODO: We can also use "throttle" middleware to limit the number of journal creations per user per minute.
    Route::post('/j', [JournalController::class, 'store'])
        ->name('journal.store')
        ->middleware(['auth', 'verified']);

    // Shows the edit page of a journal. Accessible to *authenticated* users only.
    Route::get('/j/{journal}/edit', [JournalController::class, 'edit'])
        ->name('journal.edit')
        ->middleware(['auth', 'verified', 'can:update,journal']);

    // Updates a jour. Accessible to *authenticated* users only.
    // Note: I don't know which one is better: PUT or PATCH. I'm using both lol.
    Route::put('/j/{journal}', [JournalController::class, 'update'])
        ->name('journal.update')
        ->middleware(['auth', 'verified', 'can:update,journal']);

    Route::patch('/j/{journal}', [JournalController::class, 'update'])
        ->name('journal.update')
        ->middleware(['auth', 'verified', 'can:update,journal']);

    // Deletes a journal. Accessible to *authenticated* users only.
    Route::delete('/j/{journal}', [JournalController::class, 'destroy'])
        ->name('journal.destroy')
        ->middleware(['auth', 'verified', 'can:delete,journal']);
});
