<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('journal_entries', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('name')->nullable(false);
            $table->string('slug')->nullable(false)->unique();
            $table->text('content')->nullable(false);
            $table->boolean('is_public')->nullable(false)->default(false);

            $table->foreignId('user_id')->nullable(false)->constrained()->onDelete('cascade');
            $table->foreignId('journal_id')->nullable(false)->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journal_entries');
    }
};
