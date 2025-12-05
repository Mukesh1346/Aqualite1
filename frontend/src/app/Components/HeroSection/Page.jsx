"use client";

import { useEffect, useState } from "react";
import "./herosection.css";
import toast from "react-hot-toast";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { generateSlug } from "@/app/utils/generate-slug";
import Link from "next/link";
import BannerSkeleton from "@/app/utils/skeleton/bannerSkeleton";

const HeroCarousel = () => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js"); // Bootstrap JS for carousel
  }, []);
  const [banner, setBanner] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const shopNowAlternatives = [
    "Buy Now",
    "Grab Yours",
    "Get It Now",
    "Order Now",
    "Claim Yours",
    "Discover More",
    "Step Into Comfort",
  ];
  
function getRandomCTA() {
  const randomIndex = Math.floor(Math.random() * shopNowAlternatives.length);
  return shopNowAlternatives[randomIndex];
}
  const fetchBanner = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        "/api/v1/banner/get-all-banners"
      );
      if (response.status === 200) {
        const data = response?.data?.banners?.filter(
          (item) => item?.isActive === true
        );
       
        setBanner(data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("banner error", error);
      toast.error("Something went wrong while fetching the banner");
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);
   if (isLoading) return <BannerSkeleton />;
  return (
    <div
      id="heroCarousel"
      className="carousel slide herosectionSec"
      data-bs-ride="carousel"
    >
      {/* Indicators */}
      <div className="carousel-indicators herosectionSec-indicators">
        {banner?.map((banner, index) => (
          <button
            key={banner._id}
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Banner ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Carousel Inner */}
      <div className="carousel-inner herosectionSec-inner rounded-4 shadow">
        {banner?.map((banner, index) => (
          <div
            key={banner._id}
            className={`carousel-item ${
              index === 0 ? "active" : ""
            } herosectionSec-item`}
          >
            <img
              src={banner?.bannerImage}
              className="d-block w-100 herosectionSec-img"
              alt={banner?.title}
            />
            <div className="carousel-caption d-none d-md-block herosectionSec-caption animated fadeInUp">
              <h5>{banner?.title}</h5>
              <p>{banner?.description}</p>
              <Link href={`/Pages/products/subcategory/${generateSlug(banner?.subCategory?.subCategoryName,banner?.subCategory?._id)}`} className="btn btn-lg herosectionSec-btn">
          {getRandomCTA()}  
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev herosectionSec-control"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next herosectionSec-control"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
 };

export default HeroCarousel;
