'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Banner3 from '@/app/Components/assets/bannerslide.jpg'
import Banner1 from '@/app/Components/assets/bannerslide2.webp'
import Banner2 from '@/app/Components/assets/bannerslide3.jpg'
import './carousel.css'

const images = [Banner1, Banner2, Banner3]

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // 5 seconds
    return () => clearInterval(interval)
  }, [])

  const goToPrev = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length)
  }

  return (
    <div className="carousel-container w-100">
      {images.map((img, index) => (
        <div
          key={index}
          className={`carousel-slide ${
            index === currentIndex ? 'active' : ''
          }`}
        >
          <Image
            src={img}
            alt={`Slide ${index + 1}`}
            className="carousel-img"
            fill
            priority={index === 0}
          />
        </div>
      ))}

      <button className="nav-btn prev" onClick={goToPrev}>
        ❮
      </button>
      <button className="nav-btn next" onClick={goToNext}>
        ❯
      </button>

      <div className="dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentIndex ? 'active-dot' : ''}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
