<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobQuestion extends Model
{
    protected $guarded = [];

    // protected $hidden = [
    //     'id',
    // ];

    public function QuestionBy()
    {
        return $this->hasOne('App\Models\Profile' , 'id' , 'question_by_id');
    }
}