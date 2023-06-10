<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Journal;
use App\Models\JournalEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Inertia\Inertia;

class JournalEntryController extends Controller
{
    public function show(Request $request, Journal $journal, JournalEntry $journalEntry)
    {
        return Inertia::render('journal_entry/show', [
            'journalEntry' => $journalEntry->load(['journal', 'user']),
        ]);
    }

    public function store(Request $request, Journal $journal)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'journal' => 'required|string|exists:journals,slug'
        ]);

        $journalEntry = new JournalEntry;
        $journalEntry->name = $request->name;
        $journalEntry->content = "";
        $journalEntry->excerpt = "";

        $journalEntry->slug = Str::slug($request->name, '-') . '-' . Str::random(6);

        $journalEntry->user_id = $request->user()->id;
        $journalEntry->journal_id = $journal->id;

        $journalEntry->save();

        return to_route('journal_entry.show', ['journal' => $journal, 'journalEntry' => $journalEntry]);
    }

    public function update(Request $request, Journal $journal, JournalEntry $journalEntry)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'slug' => 'sometimes|alpha_dash|max:255|unique:journal_entries,slug,' . $journalEntry->id,
            'content' => 'sometimes|string',
            'is_public' => 'sometimes|boolean'
        ]);

        $journalEntry->name = $request->name ? $request->name : $journalEntry->name;
        $journalEntry->slug = $request->slug ? Str::slug($request->slug) : $journalEntry->slug;
        $journalEntry->content = $request->content ? $request->content : $journalEntry->content;
        $journalEntry->excerpt = $request->content ? Str::limit(strip_tags($request->content, ["strong", "em"]), 255) : $journalEntry->excerpt;
        $journalEntry->is_public = $request->is_public !== null ? $request->is_public : $journalEntry->is_public;
        $journalEntry->save();

        return to_route('journal_entry.show', ['journal' => $journal, 'journalEntry' => $journalEntry]);
    }

    public function destroy(Request $request, Journal $journal, JournalEntry $journalEntry)
    {
        $journalEntry->delete();
        return to_route('journal.show', ['journal' => $journal]);
    }
}
