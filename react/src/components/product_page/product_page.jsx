import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from 'react'
import Rating from 'react-star-review'
import './product_page.scss';
import { Button } from "react-bootstrap";
export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState();

    const [selectedImage, setSelectedImage] = useState('https:\/\/burgerking.vn\/media\/catalog\/product\/cache\/1\/small_image\/316x\/9df78eab33525d08d6e5fb8d27136e95\/7\/-\/7-burger-b_-n_ng-whopper-jr_1.jpg');
    const images = [
        'https:\/\/burgerking.vn\/media\/catalog\/product\/cache\/1\/small_image\/316x\/9df78eab33525d08d6e5fb8d27136e95\/7\/-\/7-burger-b_-n_ng-whopper-jr_1.jpg',
        'https://burgerking.vn//media//catalog//product//cache//1//small_image//316x//9df78eab33525d08d6e5fb8d27136e95//6//-//6-burger-ca.jpg',
        'https:\/\/burgerking.vn\/media\/catalog\/product\/cache\/1\/small_image\/316x\/9df78eab33525d08d6e5fb8d27136e95\/1\/2\/12-burger-b_-n_ng-h_nh-chi_n_4.jpg',
        // Add more image URLs here
    ];

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/products/1`).then(res => setProduct(res.data));
    // }, []);
    return <div className="Product-Page card h-100 col-sm-12 mb-3 d-flex flex-row py-4">
        <div className="Image-List">
            {
                images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        className="img-fluid rounded m-1"
                        style={{ opacity: selectedImage === image ? 1 : 0.5 }}
                        alt="product-image"
                        onClick={() => setSelectedImage(image)}
                    />
                ))
            }
        </div>
        <div className="Active-Image">
            {selectedImage && <img src={selectedImage} alt="" className="img-fluid rounded" />}
        </div>
        <div className="Description">
            <div className="first-row d-flex flex-column">
                {/* product-name */}
                <h2 className="product-name">
                    BURGER BÒ NƯỚNG WHOPPER JR
                </h2>
                {/* rating */}
                <Rating size={20} interactive rating={5} hoverColor='red' onRatingChanged={e => console.log(e)}></Rating>
                {/* price */}
                <p className="price"><h3>159.000đ</h3>
                </p>
            </div>
            {/* quantity-change */}
            <div class="qty-input">
                <button class="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                <input class="product-qty" type="number" name="product-qty" min="0" max="10" value="1" />
                <button class="qty-count qty-count--add" data-action="add" type="button">+</button>
            </div>
            {/* add-to-cart-button */}
            <div className="add-to-cart-button mt-4">
                <Button className="button-of-productpage">Thêm vào giỏ hàng <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg></Button>
            </div>

        </div>
    </div>
}
