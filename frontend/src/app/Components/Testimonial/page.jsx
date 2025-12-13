// components/TestimonialSlider.jsx
"use client"
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./testimonial.css"; 
const testimonials = [
  {
    name: "Vishnu Sahu",
    role: "Patna, Bihar",
    image: "/testimonial1.jpg",
    message: "Absolutely in love with my new sofa! The craftsmanship is top-notch, and it perfectly complements my living room. Very comfortable and sturdy  highly recommend!",
  },
  {
    name: "Gaurav Panchal",
    role: "Bawana, Delhi",
    image: "/testimonial2.jpg",
    message: "Received my dining set within a week. The finish is premium, and the installation was quick. Worth every penny!",
  },
  {
    name: "Mukesh Singh",
    role: "Tanakpur, Uttrakhand",
    image: "/testimonial4.jpg",
    message: "Finding stylish Aqualite Mattres at a good price was tough until I discovered this site. My bedroom looks like a Pinterest board now!",
  },
  {
    name: "Nitin Gupta",
    role: "Rohini, Delhi",
    image: "/profile.jpg",
    message: "Quality, comfort, and style—this site has it all. My guests keep asking where I bought my new sofa set.",
  }
];

const TestimonialSlider = () => {
  return (
    <>    
        <h2 className="theme-text text-center  mt-3">Client Testimonial</h2>  
      <div className="testimonialMainSec">
   
    <div className="testimonial-container">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
              <img src={t.image} alt={t.name} className="testimonial-img" />
              <h3 className="text-light">{t.name}</h3>
              <p className="role text-light ">{t.role}</p>
              <p className="message text-light pb-3">“{t.message}”</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
    </>

  );
};

export default TestimonialSlider;
