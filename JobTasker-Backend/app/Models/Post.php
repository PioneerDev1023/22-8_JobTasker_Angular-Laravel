<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = [];

    public function Comments()
    {
    	return $this->hasMany('App\Models\PostComment', 'post_id','id');
    }

    public function Category()
    {
    	return $this->hasOne('App\Models\PostCategory', 'id','post_category_id');
    }
}