<?php

namespace App\Http\Controllers;

use App\Models\JournalEntry;
use Inertia\Inertia;

class FeedController extends Controller
{
    public function feed()
    {
        return Inertia::render('feed', []);
    }

    public function news()
    {
        return Inertia::render('news');
    }

    public function newsEntries()
    {
        $latestJournalEntries = JournalEntry::orderBy('created_at', 'desc')
            ->with(['user', 'journal'])
            ->select(['id', 'name', 'slug', 'excerpt', 'created_at', 'is_public', 'user_id', 'journal_id'])
            ->withCount(['likers', 'comments'])->paginate(12);

        $latestJournalEntries = auth()->user()->attachLikeStatus($latestJournalEntries);
        return response()->json($latestJournalEntries);
    }
}
