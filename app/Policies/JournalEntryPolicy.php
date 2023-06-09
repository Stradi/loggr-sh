<?php

namespace App\Policies;

use App\Models\Journal;
use App\Models\JournalEntry;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class JournalEntryPolicy
{
  public function view(?User $user, JournalEntry $entry, Journal $journal): Response
  {
    if ($entry->is_public) {
      return Response::allow();
    }

    if ($user && $user->id === $entry->user_id) {
      return Response::allow();
    }

    return Response::deny('This journal entry is private.');
  }

  /**
   * Determine whether the user can update the model.
   */
  public function update(User $user, JournalEntry $journalEntry, Journal $journal): Response
  {
    if ($user->id !== $journalEntry->user_id) {
      return Response::deny('You do not own this journal entry.');
    }

    if ($journal->id !== $journalEntry->journal_id) {
      return Response::deny('This journal entry does not belong to this journal.');
    }

    return Response::allow();
  }

  /**
   * Determine whether the user can delete the model.
   */
  public function delete(User $user, JournalEntry $journalEntry, Journal $journal): Response
  {
    if ($user->id !== $journalEntry->user_id) {
      return Response::deny('You do not own this journal entry.');
    }

    if ($journal->id !== $journalEntry->journal_id) {
      return Response::deny('This journal entry does not belong to this journal.');
    }

    return Response::allow();
  }
}
