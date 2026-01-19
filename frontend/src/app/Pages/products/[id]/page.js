"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "./productdetail.css";
import { IoCallOutline } from "react-icons/io5";
import { TbMessages } from "react-icons/tb";
import Product from "@/app/Components/Products/product";
import { FaCartArrowDown } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import axios from 'axios';

import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, AddToCartToServer } from "@/app/redux/slice/cartSlice";
import { extractIdFromSlug, generateSlug } from "@/app/utils/generate-slug";
import PopUpForm from '@/app/Components/PopUpFrom/PopUpForm'

// import image1 from "../../../Components/assets/about2.png"
// import image2 from "../../../Components/assets/banner1.jpg"
// import image3 from "../../../Components/assets/banner2.jpg"
// import image4 from "../../../Components/assets/banner3.webp"
// import image5 from "../../../Components/assets/about2.png"
import Image from "next/image";
import ProductDetailsSkeleton from "@/app/utils/skeleton/ProductDetailsSkeleton";

const ImageCarousel = ({ product }) => {
  const mainSlider = useRef(null);
  const thumbSlider = useRef(null);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);



  useEffect(() => {
    setNav1(mainSlider.current);
    setNav2(thumbSlider.current);
  }, []);
  console.log("XXX:::==>", product)
  const imageArray = product?.images || [];
  console.log("XXX:::==>", imageArray)
  const mainSettings = {
    asNavFor: nav2,
    ref: mainSlider,
    arrows: false,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const thumbSettings = {
    asNavFor: nav1,
    ref: thumbSlider,
    slidesToShow: Math.min(5, imageArray?.length),
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: true,
    centerMode: imageArray?.length > 4, // ✅ enable centerMode only if more than 4 images
    infinite: false, // ✅ prevent repeating
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(3, imageArray?.length),
          centerMode: imageArray?.length > 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(2, imageArray?.length),
          centerMode: imageArray?.length > 2,
        },
      },
    ],
  };

  return (
    <div
      className="carousel-wrapper"
      style={{ maxWidth: "580px", margin: "auto", height: "650px" }}
    >
      <Slider {...mainSettings}>
        {imageArray?.map((img, i) => (
          <div key={i}>
            <Image
              src={img}
              width={500}
              height={500}
              className="img-fluid"
              style={{
                height: "500px",
                objectFit: "cover",
                borderRadius: "10px",
                width: "100%",
              }}
              alt={`Main ${i}`}
            />
          </div>
        ))}
      </Slider>

      {imageArray?.length > 1 && (
        <div className="mt-3">
          <Slider {...thumbSettings}>
            {imageArray?.map((img, i) => (
              <div key={i}>
                <Image
                  src={img}
                  className="img-fluid"
                  width={50}
                  height={50}
                  style={{
                    cursor: 'pointer',
                    padding: 5,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  alt={`Thumb ${i}`}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

const Page = () => {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [faqData, setFaqData] = useState([]);

  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showCustomPopup, setShowCustomPopup] = useState(false);

  const categories = ["Single", "Double", "Queen", "King", "Custom"];
  const units = ["Inch", "Cm", "Ft"];

  const sizeOptions = {
    Inch: ["72x36", "75x48", "78x60", "84x72", "Custom"],
    Cm: ["183x91", "190x122", "198x152", "213x183", "Custom"],
    Ft: ["6x3", "6.25x4", "6.5x5", "7x6", "Custom"],
  };

  const thicknessOptions = [
    "4 inch",
    "6 inch",
    "8 inch",
    "10 inch",
    "12 inch",
    "14 inch",
    "16 inch",
    "18 inch",
    "20 inch",
  ];

  const [selectedCategory, setSelectedCategory] = useState(product?.size[0]);
  const [selectedUnit, setSelectedUnit] = useState("Inch");
  const [selectedThickness, setSelectedThickness] = useState(product?.size[0]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [price, setPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  console.log("XXXX::=>", selectedThickness)

  const fetchProductDetails = async () => {
    const productId = extractIdFromSlug(id);
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/api/v1/product/get-single-product/${productId}`
      );
      const data = response?.data?.data;
      setProduct(data);
      // console.log("XXXXZZZZZXXXXXXX::=>",  size[0].mattressDimension)
      setSelectedCategory(data.size[0]);
      setSelectedThickness(data.size[0].size[0]);
      setSelectedSize(data?.size[0]?.size[0]?.mattressDimension[0]?.dimension);
      setPrice(data.price);
      setFinalPrice(data.finalPrice);

      setFaqData([
        {
          question: "Specifications",
          answer: data?.Specifications,
        },
        {
          question: "Brand & Collection Overview",
          answer: data?.BrandCollectionOverview,
        },
        {
          question: "Care & Maintenance",
          answer: data?.CareMaintenance,
        },
        {
          question: "Seller",
          answer: data?.seller,
        },
        {
          question: "Warranty",
          answer: data?.Warranty,
        },
      ]);

      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log("product details", error.message);
      toast.error("Failed to fetch product details. Please try again.");
    }
  };
  const fetchRelatedProducts = async ({ subCategoryId }) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/sub-category/get-products-by-sub-category/${subCategoryId}`
      );
      if (response.status == 200) {
        const data = response?.data?.data;
        setRelatedProducts(data);
      }
    } catch (error) {
      console.log("product details", error.message);
      toast.error("Failed to fetch product details. Please try again.");
    }
  };
  const { user } = useSelector((state) => state.auth);
  const handleAddToCart = () => {
    let quantity = 1;

    if (quantity > product.stock) {
      toast.error("Out of stock");
      return;
    }

    if (user?.email) {
      dispatch(AddToCartToServer({
        productId: product._id, quantity,
        sizeName: selectedCategory?.name,
        thickness: selectedThickness?.hight,
        mattressDimension: selectedSize,
        mattressPrice: price,
        mattressFinalPrice: finalPrice
      }));
      toast.success("Product added to cart", {
        position: "bottom-right",
      });
    } else {
      dispatch(
        addToCart({
          productId: product._id,
          quantity,
          image: product.images[0],
          finalPrice: product.finalPrice,
          name: product.productName,
          dimensionsCm: product.dimensionsCm,
          stock: product.stock,
          discount: product.discount,
          price: product.price,
          sizeName: selectedCategory?.name,
          thickness: selectedThickness?.hight,
          mattressDimension: selectedSize,
          mattressPrice: price,
          mattressFinalPrice: finalPrice
        })
      );
      toast.success("Product added to cart", {
        position: "bottom-right",
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/Pages/Checkout");
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  console.log("LLLLLLL::=>", selectedCategory?.name, selectedThickness?.hight, selectedSize, price, finalPrice)

  useEffect(() => {
    if (product) {
      const subCategoryId = product?.subCategory?._id;
      if (!subCategoryId) return;
      fetchRelatedProducts({ subCategoryId: product?.subCategory?._id });
    }
  }, [id, product]);

  const calculateFoamPrice = (
    dimension,
    height,
    foamRate = 0 // ₹ per cubic foot
  ) => {
    if (!dimension || !height) return 0;

    // "12 X 33" → [12, 33]
    const [length, width] = dimension
      .toLowerCase()
      .replace("×", "x")
      .split("x")
      .map(v => parseFloat(v.trim()));

    if (!length || !width || !height) return 0;

    // cubic inches
    const cubicInches = length * width * height;

    // cubic feet
    const cubicFeet = cubicInches / 1728;

    // price
    return Math.round(cubicFeet * foamRate);
  };

  useEffect(() => {
    if (selectedSize && selectedThickness) {
      const calculatedPrice = calculateFoamPrice(
        selectedSize,
        selectedThickness?.hight,
        product.price // foam rate
      );

      const calculatedFinalPrice = calculateFoamPrice(
        selectedSize,
        selectedThickness?.hight,
        product.finalPrice // foam rate
      );
      setPrice(calculatedPrice);
      setFinalPrice(calculatedFinalPrice);
    }
  }, [selectedSize, selectedThickness]);

  if (loading) return <ProductDetailsSkeleton />;
  console.log("XXXX::=>", product)
  return (
    <>
      <nav aria-label="breadcrumb" className="pretty-breadcrumb">
        <div className="container">
          <ol className="breadcrumb align-items-center">
            <li className="breadcrumb-item">
              <Link href="/">
                <span className="breadcrumb-link">Home</span>
              </Link>
            </li>
            {product?.category?.categoryName && (
              <li className="breadcrumb-item">
                <Link
                  href={`/Pages/category/${generateSlug(
                    product?.category?.categoryName,
                    product?.category?._id
                  )}`}
                >
                  <span className="breadcrumb-link">
                    {product?.category?.categoryName}
                  </span>
                </Link>
              </li>
            )}

            <li className="breadcrumb-item">
              <Link
                href={`/Pages/products/subcategory/${generateSlug(
                  product?.subCategory?.subCategoryName,
                  product?.subCategory?._id
                )}`}
              >
                <span className="breadcrumb-link">
                  {product?.subCategory?.subCategoryName}
                </span>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Product Details
            </li>
          </ol>
        </div>
      </nav>

      <div className="product-details">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {product && <ImageCarousel product={product} />}
            </div>

            <div className="col-md-6"  >
              {product && (
                <div className="product-details-content">
                  <h2 className="details-heading Producttitle">
                    {" "}
                    {product?.productName}
                  </h2>
                  <div
                    className="detail-description"
                    dangerouslySetInnerHTML={{ __html: product?.description }}
                  ></div>

                  <div className="price-section">
                    <p className="final-price"> ₹{finalPrice}</p>
                    <p className="price">
                      <del> ₹{price}</del>
                    </p>
                    <p className="discount">{product?.discount}% OFF</p>
                  </div>
                  <div className="product-overview">
                    <h3>Product Overview</h3>
                    <hr />
                    <ul className="overview-list">
                      <li>
                        <strong>Material :</strong>{" "}
                        <span className="text-info">{product?.material}</span>
                      </li>
                      <li>
                        <strong>WEIGHT :</strong>
                        {product?.weight}
                      </li>
                      <li>
                        <strong>Dimensions(inch) :</strong>{" "}
                        {product?.dimensionsInch}
                      </li>
                      <li>
                        <strong>Dimensions(Cm):</strong>
                        {product?.dimensionsCm}
                      </li>
                      <li>
                        <strong>Brand :</strong> {product?.brand}
                      </li>

                      <li>
                        <strong>Firmness :</strong> {product?.firmnessLevel} Soft / Medium / Firm
                      </li>
                      <li>
                        <strong>Comfort Level :</strong> {product?.comfortLevel} low/Medium/High
                      </li>

                      {/* <li>
                         <strong>SKU :</strong>
                         {product?.sku}
                       </li> */}
                      {/* <li>
                         <strong>Stock :</strong>
                         {product?.stock === 0 ? "Out of Stock" : product?.stock}
                       </li> */}
                    </ul>

                    <div className="d-flex gap-2">
                      {product?.size?.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedCategory(item);
                            if (item === "Custom") setShowCustomPopup(true);
                          }}

                          className={`${selectedCategory === item
                            ? " CategoriesBtn  rounded "
                            : "CategoriesBtnHover"
                            }`}
                        >
                          {item.name}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          setSelectedCategory("Custom");
                          setShowCustomPopup(true);
                        }}

                        className={`${selectedCategory === "Custom"
                          ? " CategoriesBtn  rounded "
                          : "CategoriesBtnHover"
                          }`}
                      >
                        Custom
                      </button>

                      {/* {categories.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedCategory(item);
                            if (item === "Custom") setShowCustomPopup(true);
                          }}

                          className={`${selectedCategory === item
                            ? " CategoriesBtn  rounded "
                            : "CategoriesBtnHover"
                            }`}
                        >
                          {item}
                        </button>
                      ))} */}

                    </div>
                    <PopUpForm
                      user={user}
                      product={product}
                      open={showCustomPopup}
                      onClose={() => setShowCustomPopup(false)}
                    />


                    <div className="ThicknessSection">
                      <h3 className="detailTitle mb-3">Thinckness Available </h3>
                      <div className="ThicknesSection">
                        {selectedCategory?.size?.length > 0 && selectedCategory?.size.map((item) => (
                          <label
                            key={item?.hight}
                            className=" d-flex align-items-center gap-1 "
                          >
                            <input
                              type="radio"
                              name="thickness"
                              value={item?.hight}
                              checked={selectedThickness?.hight === item?.hight}
                              onChange={() => setSelectedThickness(item)}
                            />
                            {item?.hight}"
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 fw-semibold">Select Size</h3>

                      {/* UNIT BUTTONS (Bootstrap) */}
                      {/* <div className="d-flex gap-2 mb-3" role="group">
                        {units.map((u) => (
                          <button
                            key={u}
                            onClick={() => {
                              setSelectedUnit(u);
                              setSelectedSize(sizeOptions[0]);
                            }}
                            className={` ${selectedUnit === u ? "SizeBtn" : "SizeBtnHover"
                              }`}
                          >
                            {u.toUpperCase()}
                          </button>
                        ))}
                      </div> */}

                      {/* SIZE OPTIONS (Bootstrap Radio Buttons Grid) */}
                      <div className="row">
                        {selectedThickness?.mattressDimension.length > 0 && selectedThickness?.mattressDimension?.map((sz) => (
                          <div className="col-3 mb-3" key={sz?.dimension}>
                            <label className="form-check-label d-flex align-items-center gap-2">
                              <input
                                type="radio"
                                className="form-check-input"
                                name="sizes"
                                value={sz.dimension}
                                checked={selectedSize === sz.dimension}
                                onChange={() => setSelectedSize(sz.dimension)}
                              />
                              {sz.dimension}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      {selectedSize === "Custom" && (
                        <div className="custom-size-inputs mt-3">
                          <h3 className="mb-2 fw-semibold">
                            Enter Custom Size (in {selectedUnit})
                          </h3>

                          <div className="input-group w-75">
                            <input
                              type="text"
                              className="form-control "
                              placeholder={`Enter size in ${selectedUnit}`}
                            />
                            <button className="AddBtn" type="button">
                              Add
                            </button>
                          </div>
                        </div>

                      )

                      }
                    </div>

                    <div className="product-details-cart-button">
                      {" "}
                      <button className=" cartbtn " onClick={handleAddToCart}>
                        {" "}
                        <FaCartArrowDown className="fs-3" /> ADD TO CART
                      </button>
                      <button className="buy-now" onClick={handleBuyNow}>
                        {" "}
                        <MdElectricBolt className="fs-3" /> Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className={`container my-3 faqSection`}>
                <div className={`accordion accordionCustom`} id="faqAccordion">
                  {faqData.map((item, index) => (
                    <div className={`accordion-item accordionItem`} key={index}>
                      <h2 className="accordion-header" id={`faq${index}`}>
                        <button
                          className={`accordion-button ${index !== 0 ? "collapsed" : ""
                            } accordionButton`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded={index === 0 ? "true" : "false"}
                          aria-controls={`collapse${index}`}
                        >
                          {item.question}
                        </button>
                      </h2>
                      <div
                        id={`collapse${index}`}
                        className={`accordion-collapse collapse ${index === 0 ? "" : ""
                          }`}
                        aria-labelledby={`faq${index}`}
                        data-bs-parent="#faqAccordion"
                      >
                        <div className={`accordion-body accordionBody`}>
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="container">
            <div className="cal-contact-section">
              <h2>Need Help in Buying?</h2>
              <Link className="request-call" href="tel:+919319846114">
                Request A Call Back
              </Link>
              <p className="textOr">Or</p>
              <div className="call-main">
                <div className="calling-main">
                  <IoCallOutline className="icn" />
                  <div className="mobilenotshow">
                    <p>Call Us</p>
                    <Link href="tel:+919319846114">+91 9319846114</Link>
                  </div>
                </div>
                <p className="call-line">|</p>
                <div className="calling-main">
                  <TbMessages className="icn" />
                  <div className="mobilenotshow">
                    <p>Live Chat</p>
                    <Link href="#">Talk To Expert</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-5">
              <Product products={relatedProducts} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;