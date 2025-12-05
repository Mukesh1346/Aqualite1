import React from 'react'
import './aboutus.css'
import aboutImage from "../../Components/assets/aboutsection.avif"
import aboutImage2 from "../../Components/assets/about2.png"
import Image from 'next/image'
import { IoArrowRedoCircleSharp } from "react-icons/io5";
import Link from 'next/link'

const page = () => {
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
                            About Us
                        </li>
                    </ol>
                </div>
            </nav>

            <section className='aboutUs'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-md-6'>
                            <div className='aboutUsText'>
                                <h1>
                                    We offer high-quality, stylish furniture that adds comfort and elegance to your home—crafted to last and impress every day.
                                </h1>
                                <h3>Stylish, Durable Furniture Designed to Elevate Your Home</h3>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='aboutUsImage'>
                                <Image src={aboutImage} alt="About Us" />
                            </div>
                        </div>
                    </div>
                    <div className='aboutUsContent'>
                        <h2>About Manmohan Furniture</h2>
                        <p>Manmohan Furniture is a best furniture showroom in Delhi offers the best home furniture for  living room decoration . This furniture business is passionate to provide a high quality, stylish, and affordable best furniture to our customers in Gurgaon, Delhi, India.</p>
                        <p>We believe that each one of us deserves to have a home or office that we love, and we are here to help you create that special space.</p>
                        <p>We offer a wide variety of furniture including almirah, sofas, chairs, tables, beds, couches, dressing tables, center tables and more. We also carry a variety of home decor items, such as curtains and showpieces. We assure to have something for everyone, and we are confident that you will definitely find the perfect pieces to complete your home/office.</p>
                        <p>
                            Our furniture is made with the highest quality materials and process. We work with the best artisans to create our masterpieces. We are committed to providing our customers with furniture that will last for years to come with lifetime warranty.
                        </p>
                    </div>
                    <div className='whyUs'>
                        <h2>Why Choose Us</h2>
                        <p>There are many reasons to choose us for your furniture needs. Here are just a few, not limited to:</p>
                        <ul className='list-unstyled'>
                            <li> <span className='about-arrow-icon'> <IoArrowRedoCircleSharp /> </span> Biggest home furniture showcase to display products of more than 500 ready items. It is a perfect place to find the best home furniture product for your living room or wedding occassion in Delhi.
                            </li>
                            <li> <span className='about-arrow-icon'> <IoArrowRedoCircleSharp /> </span> We have our own 100% manufacturing units to ensure our furniture is made with the highest quality materials and construction.
                            </li>
                            <li> <span className='about-arrow-icon'> <IoArrowRedoCircleSharp /> </span> We offer competitive best prices on all of our furniture items.
                            </li>
                            <li> <span className='about-arrow-icon'> <IoArrowRedoCircleSharp /> </span> We have a knowledgeable and friendly staff that is here to help you find the perfect pieces place.
                            </li>
                            <li> <span className='about-arrow-icon'> <IoArrowRedoCircleSharp /> </span> We offer delivery and assembly services at your doorstep, so you can relax and let us take care of everything.
                            </li>
                        </ul>
                    </div>

                    <div className='row align-items-center'>
                        <div className='col-md-6'>
                            <div className='aboutUsText'>
                                <h1>
                                    Your Perfect Furniture Solution:
                                </h1>
                                <p>We invite you to visit our best home furniture showroom today. You will experience yourself that why we are the perfect choice for your best home furniture needs. We look forward to helping you create the home/office of your dreams!</p>
                                <p>
                                    Our knowledgeable, professional and friendly staff is here to help you find the perfect pieces for your home/office. We also offer delivery and assembly services at your place, so you can relax and let us take care of everything else.
                                </p>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='aboutUsImage'>
                                <Image src={aboutImage2} alt="About Us" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2>
                            High Quality Furniture Showroom Near Me
                        </h2>
                        <p>
                            Manmohan Furniture is your go-to destination for best home furniture that exudes luxury and elegance. Our showroom boasts a wide selection of classic furniture, modern furniture and contemporary furniture. This is the best home furniture showrom in delhi that elevate the aesthetic of any room in your home.
                        </p>
                        <p>
                            We also sell solid wood furniture in our online marketplace, including reception cabinets, dining tables, shoe racks, mattresses, and storage cabinets. You may explore several sofa designs side by side, evaluate prices and finishes, and find unusual modular furniture pieces that might not be offered nearby.
                        </p>
                        <p>
                            Product Features:
                        </p>
                        <ul className='list-unstyled'>
                            <li> <span className='about-arrow-icon'> <IoArrowRedoCircleSharp /> </span> Best home furniture showroom: We take pride in offering only the best quality furniture made from premium materials that are built to last.</li>
                            <li> <span className='about-arrow-icon'> <IoArrowRedoCircleSharp /> </span> Classic furniture showroom: If you prefer timeless pieces with a touch of elegance, our showroom has a curated collection of classic furniture designs that never go out of style.</li>
                            <li> <span className='about-arrow-icon'> <IoArrowRedoCircleSharp /> </span> High-quality furniture showroom: Our commitment to excellence and craftsmanship is evident in every piece of furniture we offer, ensuring that you receive only the highest quality products.</li>
                            <li> <span className='about-arrow-icon'> <IoArrowRedoCircleSharp /> </span> Latest furniture showroom: Stay ahead of the trends with our range of modern and contemporary furniture that feature sleek designs and innovative styles to suit any taste.</li>
                        </ul>
                        <p>
                            Visit Manmohan Furniture today and discover the perfect furniture pieces to transform your living space into a stylish oasis of comfort and sophistication.
                        </p>
                        <p>
                            Home Furniture shop in Delhi | Best Home Furniture shop in Dwarka | Home Furniture shop in Gurgaon | Furniture showroom in Delhi | Furniture showroom in Dwarka | Furniture showroom in Gurgaon | Furniture shop in Delhi | Furniture shop in Dwarka | Furniture shop in Gurgaon | Luxury Furniture shop in Delhi | Luxury Furniture shop in Dwarka | Furniture Store in Delhi | Furniture Online in Gurgaon | Furniture Shop in Rohtak | Luxury Furniture in Bahadurgarh | Modern Furniture in Faridabad | Office Furniture in Delhi NCR | Double Bed in Ghaziabad | Luxury Bed in Mahipalpur | Low Floor Bed in Bizwasan | Sofa Set in Delhi | Best Quality Furniture Showroom in Dwarka | Modern Furniture Showroom in Nangloi | LivIng Room Furniture in Najafgarh | Luxury Furniture shop in Gurgaon |
                        </p>
                    </div>

                </div>
            </section>
        </>
    )
}

export default page