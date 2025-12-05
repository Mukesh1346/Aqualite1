"use client";

import Image from "next/image";
import React from "react";
import Banner from "@/app/Components/assets/ReviewBanner.webp";
import Shot from "@/app/Components/assets/shot.webp";
import "./review.css";
import pic1 from "@/app/Components/assets/testimonial2.jpg";
import pic2 from "@/app/Components/assets/testimonial3.jpeg";
import pic3 from "@/app/Components/assets/testimonial4.jpeg";
import pic4 from "@/app/Components/assets/testimonial4.jpeg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Navigation, Pagination, Autoplay, Keyboard, A11y } from "swiper/modules";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      title: "Best Night Sleep",
      img: pic1,
      subtitle: "More like to experience",
      client: "Mukesh Singh",
      description:
        "Easy to order, free and fast delivery. the mattress is comfortable as are the cushions, not more back and neck pain.",
    },
    {
      id: 2,
      title: "Best Night Sleep",
      img: pic2,
      subtitle: "More like to experience",
      client: "Mukesh Singh",
      description:
        "Easy to order, free and fast delivery. the mattress is comfortable as are the cushions, not more back and neck pain.",
    },
    {
      id: 3,
      title: "Best Night Sleep",
      img: pic3,
      subtitle: "More like to experience",
      client: "Mukesh Singh",
      description:
        "Easy to order, free and fast delivery. the mattress is comfortable as are the cushions, not more back and neck pain.",
    },
    {
      id: 4,
      title: "Best Night Sleep",
      img: pic4,
      subtitle: "More like to experience",
      client: "Mukesh Singh",
      description:
        "Easy to order, free and fast delivery. the mattress is comfortable as are the cushions, not more back and neck pain.",
    },
  ];

  return (
    <section className="ReviewsMainSec">
      <div className="container-fluid">
        <div className="row align-items-center gx-4">
          <div className="col-md-6">
            <div className="ReviewBannerSection">
              <Image src={Banner} alt="review banner" className="ReviewBanner" priority />
            </div>
          </div>

          <div className="col-md-6">
            <div className="ReviewRightSec">
              <div className="detailSec">
                <p className="eyebrow">Review</p>
                <h2>Don't Just Take Our Word for It</h2>
                <h5>Find Out What Our Customers Say About Emma's Best Mattress In India</h5>
              </div>

              <div className="socialImgSec">
                <Image src={Shot} alt="social shot" className="socialImg" />
              </div>

              <div className="CardSliderSection">
              <Swiper
  modules={[Navigation, Pagination, Autoplay, Keyboard, A11y]}
  spaceBetween={10}
  slidesPerView={1}
  navigation
  pagination={{ clickable: true }}
  loop={true}
  centeredSlides={false}
  autoplay={{ delay: 2500, disableOnInteraction: true }}
  keyboard={{ enabled: true }}
  grabCursor={true}
  breakpoints={{
    576: { slidesPerView: 1.2 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 2.5 },
    1200: { slidesPerView: 3 },
  }}
  className="mySwiper"
>

                  {reviews.map((r) => (
                    <SwiperSlide key={r.id}>
                      <article className="ReviewCard card">
                        <div className="CardTopSection d-flex align-items-center">
                          <div className="ClientImgWrap">
                            <Image
                              src={r.img}
                              alt={`${r.client} image`}
                              width={72}
                              height={72}
                              className="ClientImg"
                              style={{ objectFit: "cover", borderRadius: "50%" }}
                              priority={false}
                            />
                          </div>

                          <div className="detailsSec ms-3">
                            <p className="subtitle">{r.subtitle}</p>
                            <h3 className="title">{r.title}</h3>
                          </div>
                        </div>

                        <div className="bottomDetailSec">
                          <p className="desc">{r.description}</p>
                          <span className="clientName">{r.client}</span>
                        </div>
                      </article>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
