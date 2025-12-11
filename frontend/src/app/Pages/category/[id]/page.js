"use client";
import React, {  use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RelatedProducts from "@/app/Components/RelatedProducts/page";
import "./subcategory.css";
import toast from "react-hot-toast";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { useParams } from "next/navigation";
import { extractIdFromSlug, generateSlug } from "@/app/utils/generate-slug";
import { NoItem } from "@/app/utils/NoItem";

const Page = () => {
const [subcategories, setSubcategories] = useState([]);
const [products, setProducts] = useState([]);
const {id}=useParams();

const categoryId = extractIdFromSlug(id);
const fetchSubCategoryByCategory=async (id) => {
  try {
  
 const response =   await axiosInstance.get(`/api/v1/category/get-subcategories-by-category/${categoryId}`)
 if(response.status===200){
  setSubcategories(response?.data?.data);
 }
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    toast.error(error?.response?.data?.message||"Failed to fetch subcategories. Please try again later.");
  }
}

const featchCategoryProducts=async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/product/get-products-by-category/${categoryId}`);
    if (response.status === 200) {
      console.log("category products",response?.data?.data);
      
      setProducts(response?.data?.data);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error(error?.response?.data?.message || "Failed to fetch products. Please try again later.");
  }
};
useEffect(() => {
  fetchSubCategoryByCategory(id);
  featchCategoryProducts(id);
}, [id]);

useEffect(() => {
  if(typeof window !== "undefined"){
  window.scrollTo(0, 0); 
  
  }
},[])
  return (
    <>
      <div className="category-page">
        <div className="container">
          <div className="heading-section">
            <h1 className="text-center">Sub Category</h1>
            <hr />
            <p className="text-center">
              Explore our wide range of kitchen furniture, designed to enhance
              your cooking and dining experience  
            </p>
            <b>sample</b>
          </div>
          <div className="row">
            {
              subcategories?.length === 0 && (
               <NoItem name="Subcategories" />
              )}

            {subcategories?.map((subCategory, index) => (
              <div className="col-lg-2 col-md-3 col-sm-4 col-4" key={index}>
                <div className="category-card imageSec ">
                  <Link href={`/Pages/products/subcategory/${generateSlug(subCategory?.subCategoryName, subCategory?._id)}`}>
                    <Image
                      src={subCategory?.subCategoryImage || "/images/placeholder.png"}
                      alt={subCategory?.subCategoryName}
                      className="img-fluid"
                      width={200}
                      height={200}
                    />
                    <h5 className="category-product-nam">
                      {subCategory?.subCategoryName}
                    </h5>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RelatedProducts products={products} />
    </>
  );
};

export default Page;
