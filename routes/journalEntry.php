<?php

use App\Http\Controllers\JournalEntryController;
use Illuminate\Support\Facades\Route;

Route::group([], function () {
    // Shows a journal entry by its slug. Accessible to *everyone*.
    Route::get('/j/{journal}/{journalEntry}', [JournalEntryController::class, 'show'])->name('journal_entry.show');

    // Creates a new journal entry. Accessible to *authenticated* users only.
    Route::post('/j/{journal}', [JournalEntryController::class, 'store'])
        ->name('journal_entry.store')
        ->middleware(['auth', 'verified']);

    // Shows the edit page of this journal entry. Accessible to *authenticated* users only.
    Route::get('/j/{journal}/{journalEntry}/edit', [JournalEntryController::class, 'edit'])
        ->name('journal_entry.edit')
        ->middleware(['auth', 'verified', 'can:update,journalEntry,journal']);

    // Updates a journal entry. Accessible to *authenticated* users only.
    Route::put('/j/{journal}/{journalEntry}', [JournalEntryController::class, 'update'])
        ->name('journal_entry.update')
        ->middleware(['auth', 'verified', 'can:update,journalEntry,journal']);

    Route::patch('/j/{journal}/{journalEntry}', [JournalEntryController::class, 'update'])
        ->name('journal_entry.update')
        ->middleware(['auth', 'verified', 'can:update,journalEntry,journal']);

    // Deletes a journal entry. Accessible to *authenticated* users only.
    Route::delete('/j/{journal}/{journalEntry}', [JournalEntryController::class, 'destroy'])
        ->name('journal_entry.destroy')
        ->middleware(['auth', 'verified', 'can:delete,journalEntry,journal']);
});
