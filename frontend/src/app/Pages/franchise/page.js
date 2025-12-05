"use client";
import React, { useState } from "react";
import "./Franchise.css";
import Link from "next/link";
import { axiosInstance } from "@/app/utils/axiosInstance";
import toast from "react-hot-toast";
const Franchise = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.city,
      investmentBudget: formData.budget,
      message: formData.message,
    };

    try {
      const response = await axiosInstance.post(
        "/api/v1/become-franchise/create-franchise",
        payload
      );
      if (response.status === 201) {
        toast.success("Thank you for applying! We’ll be in touch soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          city: "",
          budget: "",
          message: "",
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

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
              Franchise
            </li>
          </ol>
        </div>
      </nav>

      <div className="franchise-page">
        <div className="hero-section">
          <h1>Become a Manmohan Furniture Franchise</h1>
          <p>Join one of the fastest growing furniture brands in India</p>
        </div>
        <div className="container">
          <div className="franchise-content-row">
            <div className="row">
              <div className="col-md-6">
                <div className="franchise-content">
                  <h2>Why Partner With Us?</h2>
                  <ul className="franchise-benefits">
                    <li>
                      Established and trusted brand with over X years of
                      experience in the furniture industry
                    </li>
                    <li>
                      Wide range of premium, modern and traditional furniture
                      products
                    </li>
                    <li>
                      End-to-end support: store setup, marketing, branding,
                      training, and logistics
                    </li>
                    <li>
                      Strong presence in the Indian market with growing customer
                      base
                    </li>
                    <li>Attractive ROI & high profit margins on every sale</li>
                    <li>
                      Exclusive franchise territory with zero competition from
                      other partners
                    </li>
                    <li>
                      Latest technology integration for inventory & order
                      management
                    </li>
                    <li>
                      Flexible showroom designs tailored to your location and
                      customer segment
                    </li>
                    <li>
                      Dedicated support team to assist in daily operations and
                      growth strategies
                    </li>
                    <li>
                      Consistent marketing campaigns – both digital & offline to
                      boost visibility
                    </li>
                    <li>
                      Backed by customer satisfaction and repeat business across
                      regions
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <form className="franchise-form" onSubmit={handleSubmit}>
                  <h2>Apply for Franchise</h2>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="budget"
                      placeholder="Investment Budget (e.g. ₹10-20 Lakhs)"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Tell us more about yourself or your business plan"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                    />
                  </div>
                  <button type="submit" className="franchise-submit-btn">
                    Submit Application
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Franchise;
