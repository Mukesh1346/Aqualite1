"use client"
import React, { useState } from 'react'
import './contactus.css'
import logo from "../../../../public/logo.webp"
import Image from 'next/image'
import Link from 'next/link'
import { IoIosMailOpen } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { FaInstagramSquare, FaFacebookSquare, FaTwitterSquare, FaPinterest } from 'react-icons/fa';
import { axiosInstance } from '@/app/utils/axiosInstance'
import toast from 'react-hot-toast'

const Page = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [validated, setValidated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const response = await axiosInstance.post(
        "/api/v1/contact/create-contact",
        payload
      );
      if (response.status === 201) {
        toast.success("Thank you for applying! We’ll be in touch soon.");
        setFormData({
          name: "",
          email: "",
          subject: "",
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
                            Contact Us
                        </li>
                    </ol>
                </div>
            </nav>


            <div className='contactUs'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-7'>
                            <div className='contact-details'>
                                <Image src={logo} alt="Logo" className='logo' />
                                <p className='contact-mail'>
                                    <Link href="mailto:info.manmohanfurniture@gmail.com"> <IoIosMailOpen /> info.manmohanfurniture@gmail.com</Link>
                                </p>
                                <p className='contact-phone'>
                                    <IoCall />
                                    <Link href="tel:+919250027213"> (+91) 9250 027 213</Link>
                                    <Link href="tel:+919868487598"> (+91) 9868 487 598</Link>
                                </p>
                                <address>
                                    <FaLocationDot />  4, Captain Risal Singh Marg, New Roshan Pura Extn, Najafgarh, Delhi, 110043
                                </address>
                                <div className="SocialLinks d-grid">
                                    <div>
                                        <h4 className='fs-5'>Like What you see? Follow us here</h4>
                                    </div>
                                    <div>
                                        <a href="https://www.instagram.com/manmohanfurnitures/#" className='instagramicon' target="_blank" aria-label="Instagram"><FaInstagramSquare className="fs-1 " /></a>
                                        <a href="https://www.facebook.com/ManmohanFurnitureshomedecor" className='facebookicon' target="_blank" aria-label="Facebook"><FaFacebookSquare className="fs-1" /></a>
                                        <a href="https://x.com/i/flow/login?redirect_after_login=%2FManmohanMMF" className='twittericon' target="_blank" aria-label="Twitter"><FaTwitterSquare className="fs-1" /></a>
                                        <a href="https://in.pinterest.com/manmohanfurnitures/" target="_blank" aria-label="Instagram Duplicate"><FaPinterest className="fs-1" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="contactCard">
                                <h2 className="text-center mb-4">Get in Touch</h2>
                                <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <div className="invalid-feedback">Please enter your full name.</div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        <div className="invalid-feedback">Please enter a valid email.</div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Subject</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                        <div className="invalid-feedback">Please enter a subject.</div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Message</label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                        <div className="invalid-feedback">Please enter your message.</div>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.944622166362!2d76.98470287495559!3d28.601438085493015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0fdffe441b35%3A0x9afe5631fb072106!2s4%2C%20Captain%20Risal%20Singh%20Marg%2C%20New%20Roshan%20Pura%20Extn%2C%20Najafgarh%2C%20Delhi%2C%20110043!5e0!3m2!1sen!2sin!4v1746008843970!5m2!1sen!2sin" width="100%" height="450" style={{ border: 'none' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>


        </>
    )
}

export default Page