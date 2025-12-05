"use client"
import './productItems.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Link from 'next/link';

const Product = ({products}) => {
 
    return (
        <>
       
        <div className='product-component'>
            <div className='container'>
                <div className='text-center '>
                    <h2 className='titleSec'>See More {products?.[0]?.subCategory?.subCategoryName || ''} Collection</h2>
                </div>
            <Swiper
            style={{padding:"0px 0px 20px 0px"}}
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {products?.map((product, index) => (
                    <SwiperSlide key={index}>
                        <div className='product-card'>
                            <Link href={`/Pages/products/${product._id}`} className='product-link'>
                                <img className='product-image' src={product.images[0]} alt='product-image' width={300} height={300} />
                                <div className='product-details'>
                                    <h3>{product.productName}</h3>
                                    <div className='product-price-section'>
                                        <p className='final-price'> ₹{product.finalPrice}</p>
                                        <p className='price'><del>₹{product.price}</del></p>
                                        <p className='discount'>{product.discountPrice}% OFF</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>
        </div>
        </>
    );
};

export default Product;
