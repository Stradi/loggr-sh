<?php

namespace App\Providers;

use App\Models\Journal;
use App\Models\JournalEntry;
use App\Policies\JournalEntryPolicy;
use App\Policies\JournalPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Journal::class => JournalPolicy::class,
        JournalEntry::class => JournalEntryPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
