<?php

use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

Route::post('/comment', [CommentController::class, "store"])
    ->name("comment.store")
    ->middleware(['auth', 'verified']);

Route::get('/comment/{comment}/replies', [CommentController::class, "replies"])
    ->name("comment.replies");

Route::post('/comment/{comment}/like', [CommentController::class, "like"])
    ->name("comment.like")
    ->middleware(['auth', 'verified']);

Route::post('/comment/{comment}/unlike', [CommentController::class, "unlike"])
    ->name("comment.unlike")
    ->middleware(['auth', 'verified']);
