<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    protected $guarded = [];

    public function paidBy()
    {
        return $this->hasOne('App\Models\Profile' , 'id' , 'paidby_id');
    }

    public function jobPost()
    {
        return $this->hasOne('App\Models\JobOffer' , 'id' , 'job_posts_id');
    }

    public function jobPosts()
    {
        return $this->hasOne('App\Models\JobPost' , 'id' , 'job_posts_id');
    }
}