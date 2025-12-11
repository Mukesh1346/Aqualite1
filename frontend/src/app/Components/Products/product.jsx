"use client";
import "./productItems.css";
import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";

const Product = ({ products }) => {
  const subName = products?.[0]?.subCategory?.subCategoryName || "";

  return (
    <div className="product-component">
      <div className="container">
        <h2 className="titleSec text-center">
          See More {subName} Collection
        </h2>

        {/* GRID VIEW */}
        <div className="product-grid">
          {products?.map((product) => (
            <div className="card-wrapper" key={product._id}>
              <Link
                href={`/Pages/products/${product._id}`}
                className="product-card-new"
              >
                {/* IMAGE */}
                <div className="img-box">
                  <img
                    src={product.images?.[0]}
                    alt={product.productName}
                    className="product-img"
                    loading="lazy"
                  />
                </div>

                {/* DETAILS */}
                <div className="card-content">
                  {/* Rating */}
                  <div className="rating">
                    <Star size={18} color="#f5b50a" fill="#f5b50a" />
                    <span className="rate">4.8</span>
                    <span className="reviews">(1200+)</span>
                  </div>

                  {/* Name */}
                  <h3 className="product-title">{product.productName}</h3>

                  {/* Price */}
                  <div className="price-section">
                    <span className="price">₹{product.finalPrice}</span>
                    <span className="mrp">₹{product.price}</span>
                    <span className="offer">
                      {product.discount}% OFF
                    </span>
                  </div>

                  {/* Button */}
                  <button className="shop-btn">View Details</button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
