<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ProfileCategory extends Model
{
    protected $guarded = [];

    public function category()
    {
        return $this->hasOne('App\Models\PostAdCategory', 'id','post_ad_category_id');
    }

}