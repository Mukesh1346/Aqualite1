"use client";
import React, { use, useEffect, useState } from "react";
import "../products.css";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { NoItem } from "@/app/utils/NoItem";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/app/redux/slice/categorySllice";
import { fetchMaterials } from "@/app/redux/slice/productSlice";
import { useRouter } from "next/navigation";
import { addToWishlist, addToWishlistToLocal, getWishlistFromServer, loadWishlistFromLocalStorage, removeFromWishlistToLocal, removeFromWishlistToServer } from "@/app/redux/slice/wislistSlice";

const SearchPageContent  = () => {
  const [wishlistedProductId, setWishlistedProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const priceRanges = [
    { label: "Under ₹500", priceMin: 0, priceMax: 500 },
    { label: "₹500 - ₹1,000", priceMin: 500, priceMax: 1000 },
    { label: "₹1,000 - ₹2,000", priceMin: 1000, priceMax: 2000 },
    { label: "₹2,000 - ₹10,000", priceMin: 2000, priceMax: 10000 },
    { label: "₹10,000 - ₹30,000", priceMin: 10000, priceMax: 30000 },
    { label: "Above ₹30,000", priceMin: 30000, priceMax: Infinity },
  ];
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");
  const sortBy = searchParams.get("sortBy");
  const discountMin = searchParams.get("discountMin");
  const material = searchParams.get("material");
  const toggleWishlist = (e, productId) => {
    e.preventDefault();
    setWishlistedProductId((prevId) =>
      prevId === productId ? null : productId
    );
  };
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const materials = useSelector((state) => state.product.materials);
  const params = new URLSearchParams();
  const { wishlist } = useSelector((state) => state.wishlist);
    const { user } = useSelector((state) => state.auth);
  const fetchProducts = async (id) => {
    try {
      if (query) params.append("query", query);
      if (category) params.append("category", category);
      if (priceMin) params.append("priceMin", priceMin);
      if (priceMax) params.append("priceMax", priceMax);
      if (discountMin) params.append("discountMin", discountMin);
      if (sortBy) params.append("sortBy", sortBy);
      if (material) params.append("material", material);
      const response = await axiosInstance.get(
        `/api/v1/product/search?${params.toString()}`
      );
      if (response.status === 200) {
        setProducts(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch products. Please try again later."
      );
    }
  };
  const router = useRouter();
  const searchParamsVal = useSearchParams();
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    router.push(`/Pages/products/search?sortBy=${sortValue}`);
  };
const handleWishlist = async (productId, product) => {
    const exist = wishlist?.products?.some(
      (item) => item._id.trim() === productId.trim()
    );

    if (exist) {
      if (user && user?.email) {
        dispatch(removeFromWishlistToServer(productId));
      } else {
        dispatch(removeFromWishlistToLocal(productId));
      }
    } else {
      if (user && user?.email) {
        try {
          const response = await axiosInstance.post(
            "/api/v1/wishlist/add-to-wishlist",
            {
              productId,
            }
          );
          if (response.status === 201) {
            dispatch(addToWishlist(product));
          }
        } catch (error) {
          console.log("Error adding to wishlist:", error);
          toast.error("Failed to add to wishlist. Please try again.");
        }
      } else {
        dispatch(addToWishlistToLocal(product));
      }
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [searchParams.toString(),dispatch]);
  useEffect(() => {
     if (user && user?.email) {
          dispatch(getWishlistFromServer());
        } else {
          dispatch(loadWishlistFromLocalStorage());
        }
    if (!categories.length) dispatch(fetchCategories());
  if (!materials.length) dispatch(fetchMaterials());
  }, []);
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
                    {priceRanges.map((range, index) => {
                      const isSelected =
                        searchParams.get("priceMin") ===
                          String(range.priceMin) &&
                        searchParams.get("priceMax") === String(range.priceMax);

                      const updatedParams = {
                        ...Object.fromEntries(searchParams.entries()),
                      };

                      if (isSelected) {
                        delete updatedParams.priceMin;
                        delete updatedParams.priceMax;
                      } else {
                        updatedParams.priceMin = range.priceMin;
                        updatedParams.priceMax = range.priceMax;
                      }

                      return (
                        <li key={index}>
                          <Link
                            href={{
                              pathname: "/Pages/products/search",
                              query: updatedParams,
                            }}
                            className={`dropdown-item ${
                              isSelected ? "active-btn" : ""
                            }`}
                          >
                            {range.label}
                          </Link>
                        </li>
                      );
                    })}

                    <li>
                      <Link
                        href={{
                          pathname: "/Pages/products/search",
                          query: {
                            ...Object.fromEntries(searchParams.entries()),
                            priceMin: undefined,
                            priceMax: undefined, // You can remove the price filter this way
                          },
                        }}
                        className="dropdown-item"
                      >
                        Clear Price Filter
                      </Link>
                    </li>
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
                    {categories?.slice(0, 10).map((category, index) => {
                      const currentParams = Object.fromEntries(
                        searchParamsVal.entries()
                      );
                      const isSelected =
                        currentParams.category === category._id;

                      const updatedParams = { ...currentParams };
                      if (isSelected) {
                        delete updatedParams.category;
                      } else {
                        updatedParams.category = category._id;
                      }

                      return (
                        <li key={index}>
                          <Link
                            className={`dropdown-item ${
                              isSelected ? "active-btn" : ""
                            }`}
                            href={{
                              pathname: "/Pages/products/search",
                              query: updatedParams,
                            }}
                          >
                            {category.categoryName} {isSelected && "(Remove)"}
                          </Link>
                        </li>
                      );
                    })}
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
                    {materials?.slice(0, 10).map((material, index) => {
                      const isSelected =
                        searchParams.get("material") === material;

                      const updatedParams = {
                        ...Object.fromEntries(searchParams.entries()),
                      };

                      if (isSelected) {
                        delete updatedParams.material;
                      } else {
                        updatedParams.material = material;
                      }

                      return (
                        <li key={index}>
                          <Link
                            className={`dropdown-item ${
                              isSelected ? "active-btn" : ""
                            }`}
                            href={{
                              pathname: "/Pages/products/search",
                              query: updatedParams,
                            }}
                          >
                            {material}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Discount Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Discount
                  </button>
                  <ul className="dropdown-menu">
                    {[
                      { label: "10% or more", value: 10 },
                      { label: "30% or more", value: 30 },
                      { label: "50% or more", value: 50 },
                      { label: "80% or more", value: 80 },
                    ].map((discount, index) => {
                      const isSelected =
                        searchParams.get("discountMin") ===
                        String(discount.value);

                      const updatedParams = {
                        ...Object.fromEntries(searchParams.entries()),
                      };

                      if (isSelected) {
                        delete updatedParams.discountMin;
                      } else {
                        updatedParams.discountMin = discount.value;
                      }

                      return (
                        <li key={index}>
                          <Link
                            href={{
                              pathname: "/Pages/products/search",
                              query: updatedParams,
                            }}
                            className={`dropdown-item ${
                              isSelected ? "active-btn" : ""
                            }`}
                          >
                            {discount.label}
                          </Link>
                        </li>
                      );
                    })}
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
            {products?.length === 0 && <NoItem name="Products" />}
            {products?.map((item, index) => {
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
                        src={item?.images[0] || "/images/placeholder.png"}
                        alt="product-image"
                        width={300}
                        height={300}
                      />
                      </Link>
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
                        onClick={(e) => {
                        e.stopPropagation();
                        handleWishlist(item?._id, item);
                      }}
                        aria-label="Add to Wishlist"
                      >
                        {wishlist?.products?.some(
                                               (product) => product._id === item._id
                                             ) ? (
                                               <FaHeart
                                                 className="wishlist-icon"
                                                 style={{ color: "#ffd632" }}
                                               />
                                             ) : (
                                               <FaRegHeart className="wishlist-icon" />
                                             )}
                      </button>
                  
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

export default SearchPageContent ;
