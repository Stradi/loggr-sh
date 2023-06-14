<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function replies(Request $request, Comment $comment)
    {
        $response = $comment
            ->replies()
            ->with(['user'])
            ->withCount(['replies', 'likers'])
            ->orderBy('created_at', 'desc')
            ->get();

        return auth()->user()->attachLikeStatus($response);
    }

    public function store(Request $request)
    {
        $request->validate([
            'body' => 'required',
            'journal_entry_id' => 'required',
            'parent_id' => 'nullable',
        ]);

        $comment = new Comment;
        $comment->body = $request->body;
        $comment->user_id = auth()->id();
        $comment->journal_entry_id = $request->journal_entry_id;
        $comment->parent_id = $request->parent_id ? $request->parent_id : null;

        $comment->save();

        return back();
    }

    public function like(Comment $comment) {
        auth()->user()->like($comment);
        return back();
    }

    public function unlike(Comment $comment) {
        auth()->user()->unlike($comment);
        return back();
    }
}
