<?php

namespace App\Policies;

use App\Models\Journal;
use App\Models\JournalEntry;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class JournalEntryPolicy
{
  /**
   * Determine whether the user can update the model.
   */
  public function update(User $user, Journal $journal, JournalEntry $journalEntry): Response
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
  public function delete(User $user, Journal $journal, JournalEntry $journalEntry): Response
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
