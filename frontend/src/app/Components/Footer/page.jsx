"use client";
import React, { useEffect, useState } from "react";
import "./footer.css";
import Image from "next/image";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaWallet,
  FaLaptop,
  FaInstagramSquare,
  FaFacebookSquare,
  FaTwitterSquare,
  FaPinterest,
} from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/app/redux/slice/categorySllice";
import { generateSlug } from "@/app/utils/generate-slug";
import {
  fetchFeaturedProducts,
  fetchProducts,
} from "@/app/redux/slice/productSlice";
import toast from "react-hot-toast";
import { axiosInstance } from "@/app/utils/axiosInstance";

const Footer = () => {
  // useEffect(() => {
  //   AOS.init({ duration: 600 });
  // }, []);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { products, featuredProducts } = useSelector((state) => state.product);
  
  const handleContactUs=async(e)=>{
    e.preventDefault();
    
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      toast.error("Enter a valid email address");
      return
    }
    try {
      const response = await axiosInstance.post("/api/email-inquery/email-inqueries", {
        email,
      });
      if (response.status === 201) {
        setEmail("");
        toast.success("Message sent successfully!");
      }
    } catch (error) {
      console.log("Error sending message:", error);
      toast.error(error?.response?.data?.message || "Failed to send message.");
    }
  }

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);
  return (
    <footer className="footer text-dark">
      <div className="container Footersection">
        {/* <div className="logoSection">
          <Image
            src="/logo.webp"
            alt="Manmohan Furnitures Logo"
            width={100}
            height={60}
          />
          <p className="logoText">
            Our website offers a wide range of products, including premium dupes
            that are not sold through authorized channels. However, we ensure
            top-notch quality at competitive prices, providing our customers
            with the best value.
          </p>
        </div> */}
<div className="logoSection">
  <Image
    src="/logo.webp"
    alt="Manmohan Furnitures Logo"
    width={100}
    height={60}
  />
  <p className="logoText" style={{ marginRight: "20px" }}>
    Our website offers a wide range of products, including premium dupes
    that are not sold through authorized channels. However, we ensure
    top-notch quality at competitive prices, providing our customers
    with the best value.
  </p>

  {/* Contact Us Section */}
  <div className="contactForm">
    <input
      type="email"
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter Email or phone"
      className="contactInput"
    />
    <button className="contactButton" onClick={handleContactUs}>Contact Us</button>
  </div>
</div>

        <hr />

        <div className="row">
          <div className="col-md-3 col-6 mb-4">
            <div className="QuickLinkSec">
              <h3 className="heading">Quick Links</h3>
              <ul className="list">
                <li>
                  <Link href="/Pages/products">Shop</Link>
                </li>
                <li>
                  <Link href="Components/faqs">FAQs</Link>
                </li>
                {/* <li><Link href="/order-status">Check Order Status</Link></li> */}
                <li>
                  <Link href="https://wa.me/your-number">
                    Join WhatsApp Community
                  </Link>
                </li>
                <li>
                  <Link href="https://instagram.com/yourpage" target="_blank">
                    Follow us on Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <div className="BestSellersSec">
              <h3 className="heading">Our Categories</h3>

              <ul className="list innerListGrid">
                {categories?.slice(0, 5)?.map((category, index) => (
                  <li key={index}>
                    <Link
                      href={`/Pages/category/${generateSlug(
                        category?.categoryName,
                        category?._id
                      )}`}
                    >
                      {category?.categoryName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <div className="CategoriesSec">
              <h3 className="heading">Our Best Sellers </h3>
              <ul className="list innerListGrid">
                {featuredProducts?.slice(0, 5)?.map((product) => (
                  <li key={product?._id}>
                    <Link
                      href={`/Pages/products/${generateSlug(
                        product?.productName,
                        product?._id
                      )}`}
                    >
                      {product?.productName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-4">
            <div className="InformationSec">
              <h3 className="heading">More Information</h3>
              <ul className="list">
                <li>
                  <Link href="/Pages/about-us">About Us</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/shipping-policy">Shipping Policy</Link>
                </li>
                <li>
                  <Link href="/Pages/term-conditions">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/returns">Returns & Exchanges</Link>
                </li>
                <li>
                  <Link href="/Pages/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footerBottomSec">
          <div className="bottomFlexWrapper d-flex flex-wrap justify-content-between">
            {/* Payment Methods */}
            <div className="paymentsec">
              <h4>We Accept</h4>
              <div className="d-flex gap-3 align-items-center">
                <Link href="#" aria-label="Visa" style={{ color: "brown" }}>
                  <FaCcVisa className="fs-1 text-success" />
                </Link>
                <Link
                  href="#"
                  aria-label="MasterCard"
                  style={{ color: "darkblue" }}
                >
                  <FaCcMastercard className="fs-1 text-warning" />
                </Link>
                <Link href="#" aria-label="Amex" style={{ color: "green" }}>
                  <FaCcAmex className="fs-1 text-primary" />
                </Link>
                <Link href="#" aria-label="Wallet" style={{ color: "black" }}>
                  <FaWallet className="fs-1" />
                </Link>
                <Link
                  href="#"
                  aria-label="Net Banking"
                  style={{ color: "#5b3917" }}
                >
                  <FaLaptop className="fs-1 text-info" />
                </Link>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="SocialLinks d-grid">
              <h4
                style={{
                  fontSize: "14px",
                  marginTop: "0.5rem",
                  marginBottom: "0",
                }}
              >
                Like what you see? Follow us here
              </h4>
              <div className="socialMediaSec justify-content-center d-flex gap-3">
                <Link
                  href="https://www.instagram.com/manmohanfurnitures/#"
                  target="_blank"
                  aria-label="Instagram"
                  className="instagramicon"
                >
                  <FaInstagramSquare className="fs-1 text-danger" />
                </Link>
                <Link
                  href="https://www.facebook.com/ManmohanFurnitureshomedecor"
                  target="_blank"
                  aria-label="Facebook"
                  className="facebookicon"
                >
                  <FaFacebookSquare className="fs-1 text-primary " />
                </Link>
                <Link
                  href="https://x.com/i/flow/login?redirect_after_login=%2FManmohanMMF"
                  target="_blank"
                  aria-label="Twitter"
                  className="twittericon"
                >
                  <FaTwitterSquare className="fs-1" />
                </Link>
                <a
                  href="https://in.pinterest.com/manmohanfurnitures/"
                  target="_blank"
                  aria-label="Pinterest"
                >
                  <FaPinterest className="fs-1 text-danger " />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <small>
          © {new Date().getFullYear()} Manmohan Furnitures. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
