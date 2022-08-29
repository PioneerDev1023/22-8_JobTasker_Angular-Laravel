<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskerReview extends Model
{
    use HasFactory;
    protected $table = "tasker_reviews";

    public function tasker_review(){
        return $this->BelongsTo('App\Models\jobPost' , 'job_id' , 'id');
    }
}
