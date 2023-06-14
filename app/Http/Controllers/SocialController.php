<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use App\Models\JournalEntry;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SocialController extends Controller
{
    public function follow(Request $request, string $handle): RedirectResponse
    {
        $sourceUser = $request->user();
        $targetUser = User::where('handle', $handle)->firstOrFail();

        $sourceUser->follow($targetUser);

        return redirect()->back();
    }

    public function unfollow(Request $request, string $handle): RedirectResponse
    {
        $sourceUser = $request->user();
        $targetUser = User::where('handle', $handle)->firstOrFail();

        $sourceUser->unfollow($targetUser);

        return redirect()->back();
    }

    public function followJournal(Journal $journal)
    {
        auth()->user()->follow($journal);
        return back();
    }

    public function unfollowJournal(Journal $journal)
    {
        auth()->user()->unfollow($journal);
        return back();
    }

    public function likeJournalEntry(Journal $journal, JournalEntry $journalEntry)
    {
        auth()->user()->like($journalEntry);
        return back();
    }

    public function unlikeJournalEntry(Journal $journal, JournalEntry $journalEntry)
    {
        auth()->user()->unlike($journalEntry);
        return back();
    }
}
