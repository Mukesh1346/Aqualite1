"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AllProducts from "@/app/Components/all-products/page";
import "./category.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/app/redux/slice/categorySllice";
import { generateSlug } from "@/app/utils/generate-slug";

const AllCategory = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      <nav aria-label="breadcrumb" className="pretty-breadcrumb">
        <div className="container">
          <ol className="breadcrumb align-items-center">
            <li className="breadcrumb-item">
              <Link href="/">
                <span className="breadcrumb-link"> Home</span>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              All Categories
            </li>
          </ol>
        </div>
      </nav>
      <div className="category-page">
        <div className="container">
          <div className="heading-section">
            <h1 className="text-center">All Furnitures</h1>
            <hr />
            <p className="text-center">
              Explore our wide range of kitchen furniture, designed to enhance
              your cooking and dining experience. From stylish cabinets to
              comfortable dining sets, we have everything you need to create the
              perfect kitchen.
            </p>
          </div>
          <div className="row">
            {categories?.map((category, index) => (
              <div className="col-lg-2 col-md-3 col-sm-4 col-4" key={index}>
                <div className="category-card imageSec ">
                  <Link href={`/Pages/category/${generateSlug(category?.categoryName, category?._id)}`}>
                    <Image
                      src={category?.categoryImage}
                      alt={category?.categoryName}
                      className="img-fluid"
                      width={200}
                      height={200}
                    />
                    <h5 className="category-product-nam">
                      {category?.categoryName}
                    </h5>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="AdvertisementSec container-fluid p-3">
                <div className="position-relative w-100" style={{ height: '200px' }}>
                    <Image
                        src="/advertisement.jpg"
                        alt="Advertisement Image"
                        layout="fill"
                        objectFit="cover"
                        className="img-fluid"
                        priority
                    />
                </div>
            </div> */}

      {/* <Product /> */}
      <AllProducts />
    </>
  );
};

export default AllCategory;
