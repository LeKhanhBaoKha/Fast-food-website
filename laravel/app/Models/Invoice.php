<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use HasFactory, SoftDeletes;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }

    public function staff()
    {
        return $this->belongsTo(User::class);
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function invoiceDetail()
    {
        return $this->hasMany(InvoiceDetail::class);
    }
    public function invoiceStatuses()
    {
        return $this->belongsToMany(InvoiceStatus::class);
    }
    // return $this->hasOneThrough(
    //     InvoiceStatus::class,
    //     InvoiceTrack::class,
    //     'invoice_id',
    //     'id',
    //     'id',
    //     'invoice_status_id'
    // )->latest('created_at');
    public function lastStatus()
    {
        return $this->hasOne(InvoiceTrack::class, 'invoice_id', 'id')->latest('id');
    }
    public function invoiceTracks()
    {
        return $this->hasMany(InvoiceTrack::class)->orderBy('created_at', 'desc');;
    }
    public function invoicesWithLastStatus($statusId)
    {
        return $this->whereIn('id', function ($query) use ($statusId) {
            $query->select('invoice_id')
                ->from('invoice_tracks')
                ->groupBy('invoice_id')
                ->havingRaw('MAX(created_at)')
                ->where('invoice_status_id', $statusId);
        })->get();
    }
    public function getCreatedAtAttribute($val)
    {
        return Carbon::parse($val)->getTimestampMs();
    }
    public function getUpdatedAtAttribute($val)
    {
        return Carbon::parse($val)->getTimestampMs();
    }
    protected $fillable = ['user_id', 'discount_id', 'staff_id', 'code', 'payment_method_id', 'total_price', 'address','note', 'status', 'created_at', 'updated_at', 'invoice_status_id', 'checkoutURL', 'paid_at'];
}
