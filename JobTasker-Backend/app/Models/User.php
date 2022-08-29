<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'user_type',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //Custome

    public function Profile(){
        return $this->hasOne('App\Models\Profile' , 'id' , 'id');
    }

    protected $appends = array('Cost');
    public function getCostAttribute()
    {
        $lastPorject = 'App\Models\JobPost'::where('assign_to_id', $this->id)->first();
        $Offer = ($lastPorject) ? 'App\Models\JobOffer'::where('id', $lastPorject->job_offer_id)->first() : null;

        return ($Offer) ? $Offer->amount : 0;
    }
}
