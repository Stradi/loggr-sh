<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // TODO: Allow users to add images to comments.
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->text('body');
            $table->foreignId('user_id')->nullable(false)->constrained('users')->onDelete('cascade');
            $table->foreignId('journal_entry_id')->nullable(false)->constrained('journal_entries')->onDelete('cascade');
            $table->foreignId('parent_id')->nullable()->constrained('comments')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
