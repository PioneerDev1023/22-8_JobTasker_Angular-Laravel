<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobOffer extends Model
{
    protected $guarded = [];
    // protected $hidden = [

    //     'id',

    // ];
    public function OfferBy()
    {
        return $this->hasOne('App\Models\Profile' , 'id' , 'offer_by_id');
    }
}