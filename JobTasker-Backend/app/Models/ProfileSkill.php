<?php

namespace App\Models;



use Illuminate\Database\Eloquent\Model;



class ProfileSkill extends Model

{

    protected $guarded = [];



    public function Skill()
    {
        return $this->hasOne('App\Models\Skill', 'id','skill_id');
    }

}