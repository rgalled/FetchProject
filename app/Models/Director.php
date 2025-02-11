<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Director extends Model
{
    use HasFactory;

    protected $table = 'directors';
    protected $fillable = ['name', 'bio'];

    function store() {
        try{
            $result = $this->save();
        } catch(\Exception $e) {
            $result = false;
            
        }
        return $result;
    }

    function modify($request) {
        $result = false;
        try {
            $result = $this->update($request->all());
        } catch(\Exception $e) {
        }
        return $result;
    }

    static function change($request){
        $product = new Director($request->all());
        return $product->store();
    }
    // Relación con libros (por si se usa en el futuro)
    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }
}
