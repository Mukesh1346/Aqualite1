"use client";
import React, { useEffect, useState } from "react";
import "./products.css";
import axios from "axios";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import Image from "next/image";
import { fetchMaterials, fetchProducts } from "@/app/redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/app/redux/slice/categorySllice";
import { useRouter } from "next/navigation";
import { addToWishlist, addToWishlistToLocal, addToWishlistToServer, getWishlistFromServer } from "@/app/redux/slice/wislistSlice";

const Page = () => {
  // State to track the wishlisted product ID
  const [wishlistedProductId, setWishlistedProductId] = useState(null);
  const priceRanges = [
    { label: "Under ₹500", priceMin: 0, priceMax: 500 },
    { label: "₹500 - ₹1,000", priceMin: 500, priceMax: 1000 },
    { label: "₹1,000 - ₹2,000", priceMin: 1000, priceMax: 2000 },
    { label: "₹2,000 - ₹10,000", priceMin: 2000, priceMax: 10000 },
    { label: "₹10,000 - ₹30,000", priceMin: 10000, priceMax: 30000 },
    { label: "Above ₹30,000", priceMin: 30000, priceMax: Infinity },
  ];
  // Function to toggle wishlist for a specific product



  const dispatch = useDispatch();
  const router = useRouter();
  const categories = useSelector((state) => state.category.categories);
  const materials = useSelector((state) => state.product.materials);
  const { user } = useSelector((state) => state.auth);
  const wishlist = useSelector((state) => state.wishlist);

  // Fetch products from API
  const { products } = useSelector((state) => state.product);
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    router.push(`/Pages/products/search?sortBy=${sortValue}`);
  };

  const toggleWishlist = (e, productId) => {
    console.log("ZZZXXZZZ=>", productId)
    e.preventDefault(); // Prevent navigation when clicking the heart

    if (user.email) {
      dispatch(addToWishlistToServer(productId));
    } else {
      // dispatch(addToWishlistToLocal(productId));
    }
    alert("Product added to wishlist");
    setWishlistedProductId((prevId) =>
      prevId === productId ? null : productId
    ); // Toggle wishlist state
  };


  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getWishlistFromServer())
  }, [dispatch, wishlistedProductId]);

  useEffect(() => {
    if (!categories.length) dispatch(fetchCategories());
    if (!materials.length) dispatch(fetchMaterials());
  }, [dispatch]);

  return (
    <>
      {/* Product filter section */}
      <section className="product-filter py-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="filter-first">
                <h2 className="fw-bold text-white me-4">Filter By</h2>
                {/* Price Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Price
                  </button>
                  <ul className="dropdown-menu">
                    {
                      priceRanges?.map((priceRange, index) => {
                        return (
                          <li key={index}>
                            <Link
                              className="dropdown-item"
                              href={`/Pages/products/search?priceMin=${priceRange.priceMin}&priceMax=${priceRange.priceMax}`}
                            >
                              {priceRange.label}
                            </Link>
                          </li>
                        );
                      })
                    }
                  </ul>
                </div>
                {/* Category Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Category
                  </button>
                  <ul className="dropdown-menu">
                    {categories?.slice(0, 10)?.map((category, index) => {
                      return (
                        <li key={index}>
                          <Link className="dropdown-item" href={`/Pages/products/search?category=${category?._id}`}>
                            {category?.categoryName}
                          </Link>
                        </li>
                      )
                    })
                    }
                  </ul>
                </div>

                {/* Material Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Material
                  </button>
                  <ul className="dropdown-menu">
                    {materials?.slice(0, 10)?.map((material, index) => {
                      return (
                        <li key={index}>
                          <Link className="dropdown-item" href={`/Pages/products/search?material=${material}`}>
                            {material}
                          </Link>
                        </li>
                      )
                    })
                    }

                  </ul>
                </div>

                {/* Size Dropdown */}
                {/* <div className="dropdown">
                                    <button className="btn btn-light btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                        Size
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">S</a></li>
                                        <li><a className="dropdown-item" href="#">M</a></li>
                                        <li><a className="dropdown-item" href="#">L</a></li>
                                        <li><a className="dropdown-item" href="#">XL</a></li>
                                    </ul>
                                </div> */}
                {/* Discount Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Discount
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        href="/Pages/products/search?discountMin=10"
                        className="dropdown-item"
                      >
                        10% or more
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/Pages/products/search?discountMin=30"
                        className="dropdown-item"
                      >
                        30% or more
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/Pages/products/search?discountMin=50"
                        className="dropdown-item"
                      >
                        50% or more
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="filter-second">
                <strong className="text-white">Sort By</strong>
                <select
                  className="form-select form-select-sm w-auto"
                  onChange={handleSortChange}
                >
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                  <option value="new">Newest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product list */}
      <section className="product-list">
        <div className="product-list-header">
          <h2>Products</h2>
          <p>Explore our wide range of products</p>
        </div>
        <div className="container">
          <div className="row">
            {products?.map((item, index) => {
              // console.log("XX::=>XX=>wishlist==>>", wishlist?.wishlist?.products?.map((id) => id?._id).includes(item?._id));
              return (
                <div className="col-md-3 col-6" key={index}>
                  <div
                    className="product-card"
                    style={{ position: "relative" }}
                  >
                    <Link
                      href={`/Pages/products/${item?._id}`}
                      className="product-link"
                    >
                      <Image
                        className="product-image"
                        src={item?.images[0]}
                        alt="product-image"
                        width={300}
                        height={300}
                      />
                      <div className="product-details">
                        <h3>{item.productName}</h3>
                        <div className="product-price-section">
                          <p className="final-price">₹{item?.finalPrice}</p>
                          <p className="price">
                            <del>₹{item?.price}</del>
                          </p>
                          <p className="discount">{item?.discount}% OFF</p>
                        </div>
                      </div>

                      {/* Wishlist Button */}
                      <button
                        className="wishlist-btn"
                        onClick={(e) => toggleWishlist(e, item._id)}
                        aria-label="Add to Wishlist"
                      >
                        {wishlist?.wishlist?.products?.map((id) => id?._id).includes(item?._id) ? (
                          <FaHeart className="wishlist-icon red" />
                        ) : (
                          <FaRegHeart className="wishlist-icon" />
                        )}
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wishlist styles */}
    </>
  );
};

export default Page;
