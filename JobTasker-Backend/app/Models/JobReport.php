<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobReport extends Model
{
    protected $guarded = [];
    // protected $hidden = [

    //     'id',

    // ];

    public function JobPost()
    {
        return $this->hasOne('App\Models\JobPost' , 'id' , 'job_post_id');
    }

    public function ReportedBy()
    {
        return $this->hasOne('App\Models\Profile' , 'id' , 'reported_by_id');
    }
}