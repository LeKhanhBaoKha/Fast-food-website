<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaymentMethod extends Model
{
    use HasFactory, SoftDeletes;
    
    public function invoices(){
        return $this->hasMany(Invoice::class);
    }
    protected $fillable = ['name','created_at','updated_at'];
}
