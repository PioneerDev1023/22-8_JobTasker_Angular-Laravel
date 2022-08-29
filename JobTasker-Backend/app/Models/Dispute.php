<?php

namespace App\Models;



use Illuminate\Database\Eloquent\Model;



class Dispute extends Model

{

    protected $guarded = [];



    public function JobPost()

    {

        return $this->hasOne('App\Models\JobPost', 'id','job_post_id');

    }



    public function FilledBy()
    {
        return $this->hasOne('App\Models\Profile', 'id','filled_by_id');
    }



    public function Winner()
    {
        return $this->hasOne('App\Models\Profile', 'id','winner_id');
    }



    public function FilledAgainst()

    {

        return $this->hasOne('App\Models\Profile', 'id','against_id');

    }

}