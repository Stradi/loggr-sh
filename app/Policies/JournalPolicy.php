<?php

namespace App\Policies;

use App\Models\Journal;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class JournalPolicy
{
    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Journal $journal): Response
    {
        return $user->id === $journal->user_id ? Response::allow() : Response::deny('You do not own this journal.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Journal $journal): Response
    {
        return $user->id === $journal->user_id ? Response::allow() : Response::deny('You do not own this journal.');
    }
}
