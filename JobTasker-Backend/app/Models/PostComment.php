<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostComment extends Model
{
    protected $guarded = [];

    public function commentby()
    {
        return $this->hasOne('App\Models\User', 'id','comment_by_id');
    }
}