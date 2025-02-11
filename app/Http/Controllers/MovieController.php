<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{

    public function main()
    {
        return view('main');
    }

    // Mostrar una lista paginada de libros
    public function index(Request $request)
    {
        return response()->json([
            'movies' => Movie::orderBy('title')->paginate(9),
            'user' => Auth::user()
        ]);
    }

    // Mostrar todos los libros (sin paginación)
    public function index1()
    {
        return response()->json([
            'movies' => Movie::orderBy('title')->get()
        ]);
    }

    // Crear un nuevo libro

    public function store(Request $request)
    {
        $movies = [];
        $message = '';
        $validator = Validator::make($request->all(), [
            'title'  => 'required|unique:movies|max:100|min:2',
            'director' => 'required|max:100|min:2',
            'description' => 'required|max:1000',
        ]);

        if ($validator->passes()) {
            $message = '';
           
            $movie = new Movie();
            $movie->title = $request->title;
            $movie->director = $request->director;
            $movie->description = $request->description;
            $movie->rating = 0;
            $result = $movie->save();

            if ($result) {
                return response()->json([
                    'result' => true,
                    'movies' => Movie::orderBy('title')->paginate(9),
                    'user' => Auth::user()
                ]);              } else {
                $message = 'The movie has not been saved whit no errors';
            }
        } else {
            return response()->json([
            'result' => false,
            'message' => 'The movie has not been saved, there are some errors, please revise'
        ], 500);
        }

         }


    // Mostrar detalles de un libro específico
    public function show($id)
    {
        $movie = Movie::find($id);
        $message = '';
        if ($movie === null) {
            $message = 'The movie your looking for doesn´t not exist';
        }

        return response()->json([
            'message' => $message,
            'movie' => $movie
        ]);
    }

    // Actualizar la información de un libro
    public function update(Request $request, $id)
    {
        $message = '';
        $movie = Movie::find($id);
        $movies = [];
        $result = false;

        if ($movie != null) {
            $validator = Validator::make($request->all(), [
                'title'  => 'required|max:100|min:2|unique:movies,title,' . $movie->id,
                'director' => 'required|max:100|min:2',
                'description' => 'required|max:1000',
                'image' => 'nullable|url',  // Validación de imagen opcional
                'rating' => 'nullable|numeric|min:0|max:5'
            ]);

            if ($validator->passes()) {
                $result = $movie->modify($request);
                if ($result) {
                    $movies = Movie::orderBy('title')->paginate(10)->setPath(url('movies'));
                } else {
                    $message = 'The movie has not been updated, there are some problems, please revise';
                }
            } else {
                $message = $validator->getMessageBag();
            }
        } else {
            $message = 'The movie can not be found';
        }

        return response()->json(['result' => $result, 'message' => $message, 'movies' => $movies]);
    }

    // Eliminar un libro
    public function destroy(Request $request, $id)
    {
        $message = '';
        $movies = [];
        $movie = Movie::find($id);
        $result = false;

        if ($movie != null) {
            try {
                $result = $movie->delete();
                $movies = Movie::orderBy('title')->paginate(10)->setPath(url('movies'));

                if ($movies->isEmpty()) {
                    $page = $movies->lastPage();
                    $request->merge(['page' => $page]);
                    $movies = Movie::orderBy('title')->paginate(10)->setPath(url('movies'));
                }
            } catch (\Exception $e) {
                $message = $e->getMessage();
            }
        } else {
            $message = 'The movie can not be found';
        }

        return response()->json([
            'message' => $message,
            'movies' => $movies,
            'result' => $result
        ]);
    }
}
