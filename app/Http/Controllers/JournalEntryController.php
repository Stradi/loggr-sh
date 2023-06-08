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
        ]);

        $journalEntry = new JournalEntry;
        $journalEntry->name = $request->name;
        $journalEntry->content = "";

        $journalEntry->slug = Str::slug($request->name, '-') . '-' . Str::random(6);

        $journalEntry->user_id = $request->user()->id;
        $journalEntry->journal_id = $journal->id;

        $journalEntry->save();

        return to_route('journal_entry.edit', ['journal' => $journal, 'journalEntry' => $journalEntry]);
    }

    public function edit(Request $request, Journal $journal, JournalEntry $journalEntry)
    {
        return Inertia::render('journal_entry/edit', [
            'journalEntry' => $journalEntry->load(['journal', 'user']),
        ]);
    }

    public function update(Request $request, Journal $journal, JournalEntry $journalEntry)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|alpha_dash|max:255|unique:journal_entries,slug,' . $journalEntry->id,
            'content' => 'required|string',
        ]);

        $journalEntry->name = $request->name;
        $journalEntry->slug = Str::slug($request->slug);
        $journalEntry->content = $request->content;
        $journalEntry->save();

        return to_route('journal_entry.show', ['journal' => $journal, 'journalEntry' => $journalEntry]);
    }

    public function destroy(Request $request, Journal $journal, JournalEntry $journalEntry)
    {
        $journalEntry->delete();
        return to_route('home');
    }
}
