<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Overtrue\LaravelFollow\Traits\Followable;

class Journal extends Model
{
    use HasFactory, Followable;

    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Get the user that owns the journal.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the entries for the journal.
     */
    public function entries(): HasMany
    {
        return $this->hasMany(JournalEntry::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
