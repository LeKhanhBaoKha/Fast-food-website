<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProductRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['errors' => $validator->errors()], 422));
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpg,jpeg,png,bmp',
            'price' => 'required|numeric',
            'product_type_id' => 'required|integer|exists:producttypes,id'
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Please enter a product name.',
            'description.required' => 'Please provide a product description.',
            'image.required' => 'Please upload an image for the product.',
            'image.image' => 'The uploaded file must be an image.',
            'image.mimes' => 'The image must be a valid format (jpg, jpeg, png, bmp).',
        ];
    }
}
