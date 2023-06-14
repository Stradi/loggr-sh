<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Overtrue\LaravelLike\Traits\Likeable;

class JournalEntry extends Model
{
    use Likeable;

    protected $fillable = [
        'name',
        'slug',
        'content',
        'is_public'
    ];

    /**
     * Get the journal that owns the journal entry.
     */
    public function journal(): BelongsTo
    {
        return $this->belongsTo(Journal::class);
    }

    /**
     * Get the user that owns the journal entry.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->whereNull('parent_id');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
