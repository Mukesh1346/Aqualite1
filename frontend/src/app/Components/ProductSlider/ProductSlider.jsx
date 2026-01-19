"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import "./productSlider.css";
import pic1 from '@/app/Components/assets/pic1.jpg'
import pic2 from '@/app/Components/assets/pic2.jpg'
import pic3 from '@/app/Components/assets/pic3.jpg'
import pic4 from '@/app/Components/assets/pic4.jpg'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedProducts } from "@/app/redux/slice/productSlice";

export default function ProductSlider() {
  const sliderRef = useRef();



  const dispatch = useDispatch();

  const { featuredProducts } = useSelector((state) => state.product);
  // console.log("XXXXXXXX::=>", featuredProducts)

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);


  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 330;
  };

  const slideRight = () => {
    sliderRef.current.scrollLeft += 330;
  };

  // const products = [
  //   {
  //     img: pic1,
  //     title: "Emma Hybrid Mattress",
  //     rating: "4.8",
  //     reviews: "63,677",
  //     points: [
  //       "Hybrid Airgocell® foam + AeroFlex® springs",
  //       "Orthopedic Support for Back Relief",
  //       "Enhanced Airflow for Cooler Sleep",
  //     ],
  //     price: "₹10,499",
  //     mrp: "₹17,499",
  //     offer: "40% OFF",
  //   },
  //   {
  //     img: pic2,
  //     title: "Emma Black Mattress",
  //     rating: "4.6",
  //     reviews: "24,021",
  //     points: [
  //       "Firmness Auto-Adjusts to Body Weight",
  //       "Dual-Layer Foam for Daily Comfort",
  //       "Orthopedic Support for Long Workdays",
  //     ],
  //     price: "₹6,499",
  //     mrp: "₹10,832",
  //     offer: "40% OFF",
  //   },
  //   {
  //     img: pic3,
  //     title: "Emma Original Mattress",
  //     rating: "4.5",
  //     reviews: "37,112",
  //     points: [
  //       "Advanced Ortho Foam for Spine Support",
  //       "HALO® Foam for Pressure Relief",
  //       "HRX foam which offers back support",
  //     ],
  //     price: "₹8,699",
  //     mrp: "₹14,499",
  //     offer: "40% OFF",
  //   },
  //   {
  //     img: pic4,
  //     title: "Emma Latex II Mattress",
  //     rating: "4.8",
  //     reviews: "48,414",
  //     points: [
  //       "Natural Neo Latex for Responsive Comfort",
  //       "Hypoallergenic & Eco-Friendly Build",
  //       "Natural Ventilation for Cooling Comfort",
  //     ],
  //     price: "₹12,999",
  //     mrp: "₹24,544",
  //     offer: "45% OFF",
  //   },
  //   {
  //     img: pic1,
  //     title: "Emma Hybrid Mattress",
  //     rating: "4.8",
  //     reviews: "63,677",
  //     points: [
  //       "Hybrid Airgocell® foam + AeroFlex® springs",
  //       "Orthopedic Support for Back Relief",
  //       "Enhanced Airflow for Cooler Sleep",
  //     ],
  //     price: "₹10,499",
  //     mrp: "₹17,499",
  //     offer: "40% OFF",
  //   },
  //   {
  //     img: pic2,
  //     title: "Emma Black Mattress",
  //     rating: "4.6",
  //     reviews: "24,021",
  //     points: [
  //       "Firmness Auto-Adjusts to Body Weight",
  //       "Dual-Layer Foam for Daily Comfort",
  //       "Orthopedic Support for Long Workdays",
  //     ],
  //     price: "₹6,499",
  //     mrp: "₹10,832",
  //     offer: "40% OFF",
  //   },
  //   {
  //     img: pic3,
  //     title: "Emma Original Mattress",
  //     rating: "4.5",
  //     reviews: "37,112",
  //     points: [
  //       "Advanced Ortho Foam for Spine Support",
  //       "HALO® Foam for Pressure Relief",
  //       "HRX foam which offers back support",
  //     ],
  //     price: "₹8,699",
  //     mrp: "₹14,499",
  //     offer: "40% OFF",
  //   },
  //   {
  //     img: pic4,
  //     title: "Emma Latex II Mattress",
  //     rating: "4.8",
  //     reviews: "48,414",
  //     points: [
  //       "Natural Neo Latex for Responsive Comfort",
  //       "Hypoallergenic & Eco-Friendly Build",
  //       "Natural Ventilation for Cooling Comfort",
  //     ],
  //     price: "₹12,999",
  //     mrp: "₹24,544",
  //     offer: "45% OFF",
  //   },
  // ];

  return (
    <div className="product-slider-section container py-5">
      <div className="p-4">
        <h2 className="text-center">Find the Perfect Aqualite Mattress for You</h2>
      </div>
      {/* Left Arrow */}
      <button className="arrow-btn left" onClick={slideLeft}>
        <ChevronLeft size={24} />
      </button>

      {/* Cards Wrapper */}
      <div className="product-slider" ref={sliderRef}>
        {featuredProducts?.map((item, index) => (
          <div className="product-card card shadow-sm" key={index}>
            <Image
              src={item?.images[0]}
              alt={item?.productName}
              width={400}
              height={250}
              className="card-img-top"
            />

            <div className="card-body">
              {/* <div className="rating">
                <Star size={18} color="#f5b50a" fill="#f5b50a" />{" "}
                <span className="rate">{item?.rating}</span>
                <span className="reviews">({item?.reviews})</span>
              </div> */}

              <h5 className="product-title">{item?.productName}</h5>

              {/* <ul className="features">
                {item?.points?.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul> */}

              <div
                className="text-sm text-gray-700 description-clamp"
                dangerouslySetInnerHTML={{ __html: item?.description }}
              />

              <div className="price-section">
                <span className="price"> {`₹ ${item?.finalPrice}`}</span>
                <span className="mrp">{`₹ ${item?.price}`}</span>
                <span className="offer">{`${item?.discount}% OFF `}</span>
              </div>

              <a href="/Pages/products"> <button className="shop-btn">Shop Now</button></a>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button className="arrow-btn right" onClick={slideRight}>
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
