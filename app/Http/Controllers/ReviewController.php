<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
 
    public function index(Request $request)
    {
        $reviews = Review::where('movie_id', $request->id)->get();
       
        $reviews = $reviews->map(function ($review) {
        return [
            'id' => $review->id,
            'user_id' => $review->user_id,
            'user_name' => $review->user->name, // Include the user's name
            'movie_id' => $review->movie_id,
            'rating' => $review->rating,
            'review' => $review->review,
            'created_at' => $review->created_at,
            'updated_at' => $review->updated_at,
        ];
    });

    return response()->json([
        'reviews' => $reviews,
    ]);
}
    

    /**
     * Show the form for creating a new resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        if (!Auth::check()) {
            return response()->json([
                'result' => false,
                'message' => 'You must be logged in to leave a review.'
            ], 401);
        }
        $validator = Validator::make($request->all(), [
            'movie_id' => 'required|exists:movies,id',
            'rating' => 'required|integer|min:0|max:5',
            'review' => 'required|max:1000',
        ]);

        if ($validator->fails()) { 
        return response()->json([
            'result' => false,
            'message' => 'The review has not been saved.'
        ], 500);
        }

        $review = new Review();
        $review->user_id = Auth::id();
        $review->movie_id = $request->movie_id;
        $review->rating = $request->rating;
        $review->review = $request->review;
        $result = $review->save();

        if ($result) {
            return response()->json([
                'result' => true,
                'message' => 'Review successfully added',
                'review' => $review
            ], 201);
        } 
    }
    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        //
    }
}
