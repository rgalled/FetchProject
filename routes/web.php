<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ReviewController;

// Página principal
Route::get('/', [MovieController::class, 'main']);

// Rutas para el controlador de libros
Route::resource('movie', MovieController::class)->except(['create', 'edit']);

// Ruta para obtener las reviews de un libro por su id
Route::get('review/{id}', [ReviewController::class, 'index'])->name('reviews');

// Rutas de autenticación
Route::post('login', [UserController::class, 'login'])->name('login');
Route::post('/register', [UserController::class, 'register'])->name('register');
Route::post('logout', [UserController::class, 'logout'])->name('logout');
Route::post('/review', [ReviewController::class, 'store'])->name('review');