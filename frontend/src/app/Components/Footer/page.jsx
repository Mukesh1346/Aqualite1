"use client";
import React, { useEffect, useState } from "react";
import "./footer.css";
import Image from "next/image";
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
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { products, featuredProducts } = useSelector((state) => state.product);

  const handleContactUs = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/api/email-inquery/email-inqueries",
        { email }
      );
      if (response.status === 201) {
        setEmail("");
        toast.success("Message sent successfully!");
      }
    } catch (error) {
      console.log("Error sending message:", error);
      toast.error(error?.response?.data?.message || "Failed to send message.");
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  return (
    <footer className="footer text-dark">
      <div className="container Footersection">

        <div className="logoSection">
          <Image
            src="/logo.png"
            alt="Aqualite Mattress Logo"
            className="footerlogo"
            width={140}
            height={40}
          />

          <p className="logoText">
            Aqualite Mattress offers premium-quality mattresses designed for
            perfect comfort, healthy sleep, and long-lasting durability.
            Experience luxury sleep solutions crafted with advanced technology.
          </p>

          <div className="contactForm">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="contactInput"
            />
            <button className="contactButton" onClick={handleContactUs}>
              Submit
            </button>
          </div>
        </div>

        <hr />

        <div className="row">
          {/* Quick Links */}
          <div className="col-md-3 col-6 mb-4">
            <div className="QuickLinkSec">
              <h3 className="heading">Quick Links</h3>
              <ul className="list">
                <li>
                  <Link href="/Pages/products">Shop Mattresses</Link>
                </li>
                <li>
                  <Link href="/Components/faqs">FAQs</Link>
                </li>
                <li>
                  <Link href="/Pages/contact-us">Customer Support</Link>
                </li>
                <li>
                  <Link href="https://instagram.com/" target="_blank">
                    Follow us on Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Categories */}
          <div className="col-md-3 col-6 mb-4">
            <div className="BestSellersSec">
              <h3 className="heading">Mattress Categories</h3>
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

          {/* Best Sellers */}
          <div className="col-md-3 col-6 mb-4">
            <div className="CategoriesSec">
              <h3 className="heading">Best Sellers</h3>
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

          {/* More Information */}
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
                  <Link href="/Pages/term-conditions">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/returns">Return & Refund Policy</Link>
                </li>
                <li>
                  <Link href="/Pages/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footerBottomSec">
          <div className="bottomFlexWrapper d-flex flex-wrap justify-content-between">

            {/* Payment Options */}
            <div className="paymentsec">
              <h4>We Accept</h4>
              <div className="d-flex gap-3 align-items-center">
                <FaCcVisa className="fs-1 text-primary" />
                <FaCcMastercard className="fs-1 text-warning" />
                <FaCcAmex className="fs-1 text-info" />
                <FaWallet className="fs-1" />
                <FaLaptop className="fs-1 text-secondary" />
              </div>
            </div>

            {/* Social Media */}
            <div className="SocialLinks d-grid">
              <h4
                style={{
                  fontSize: "14px",
                  marginTop: "0.5rem",
                  marginBottom: "0",
                }}
              >
                Follow us for updates
              </h4>
              <div className="socialMediaSec justify-content-center d-flex gap-3">
                <Link href="#" target="_blank" className="instagramicon">
                  <FaInstagramSquare className="fs-1 text-danger" />
                </Link>
                <Link href="#" target="_blank" className="facebookicon">
                  <FaFacebookSquare className="fs-1 text-primary" />
                </Link>
                <Link href="#" target="_blank" className="twittericon">
                  <FaTwitterSquare className="fs-1 text-info" />
                </Link>
                <Link href="#" target="_blank">
                  <FaPinterest className="fs-1 text-danger" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="text-center mt-4">
        <small>
          © {new Date().getFullYear()} Aqualite Mattress. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
