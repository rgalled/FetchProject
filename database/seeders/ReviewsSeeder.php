<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class ReviewsSeeder extends Seeder
{
    public function run()
    {
        $reviews = [
            [
                'user_id' => 1,
                'movie_id' => 3,
                'rating' => 5,
                'review' => 'Una historia increíble y atemporal.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 15,
                'movie_id' => 2,
                'rating' => 5,
                'review' => 'Un clásico imprescindible.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 17,
                'movie_id' => 19,
                'rating' => 4,
                'review' => 'Una historia de amor y venganza fascinante.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 18,
                'movie_id' => 7,
                'rating' => 5,
                'review' => 'Una obra maestra de la literatura española.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 19,
                'movie_id' => 20,
                'rating' => 4,
                'review' => 'Una historia inspiradora sobre seguir los sueños.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'movie_id' => 16,
                'rating' => 4,
                'review' => 'Un thriller cautivador con giros inesperados.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 15,
                'movie_id' => 10,
                'rating' => 5,
                'review' => 'Una historia de lujo y decadencia inolvidable.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 17,
                'movie_id' => 11,
                'rating' => 5,
                'review' => 'Una aventura épica en la Tierra Media.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 18,
                'movie_id' => 15,
                'rating' => 4,
                'review' => 'Intrigante y lleno de misterio.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 19,
                'movie_id' => 3,
                'rating' => 5,
                'review' => 'Una crítica social impactante.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'movie_id' => 19,
                'rating' => 3,
                'review' => 'Interesante pero un poco denso en algunos momentos.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 15,
                'movie_id' => 20,
                'rating' => 5,
                'review' => 'Inspirador y motivador.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 17,
                'movie_id' => 7,
                'rating' => 5,
                'review' => 'Un clásico de la literatura universal.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 18,
                'movie_id' => 2,
                'rating' => 4,
                'review' => 'Un relato fascinante de generaciones.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 19,
                'movie_id' => 16,
                'rating' => 4,
                'review' => 'Engancha desde el primer capítulo.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        DB::table('reviews')->insert($reviews);
    }
}
