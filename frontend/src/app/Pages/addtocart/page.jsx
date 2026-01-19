"use client";
import React, { useState, useEffect } from "react";
import "./cart.css";
import Image from "next/image";
import pic1 from "@/app/Components/assets/icon6.webp";
import pic2 from "@/app/Components/assets/icon7.webp";
import Link from "next/link";
import {
  decreaseQuantity, fetchCartItems, increaseQuantity,
  removeFromCart, safeJSONParse, setCartFromLocalStorage, updateQuantity,
} from "@/app/redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "@/app/utils/axiosInstance";

const Cart = () => {
  const [totals, setTotals] = useState({ total: 0, mrp: 0, discount: 0 });
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    calculateTotals();
  }, [items]);
  console.log("XXXX::>=>", items)
  const { user, loading } = useSelector((state) => state.auth);
  const handleDecrease = async (productId, quantity) => {
    if (quantity === 1) return;
    if (user && user?.email) {
      try {
        await dispatch(updateQuantity({ productId: productId?._id, action: "decrease" }));
        dispatch(fetchCartItems());
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(decreaseQuantity({ productId }));
    }
  };

  const handleIncreaseQuantity = async (productId, quantity, stock) => {
    if (quantity === stock) return;
    if (user && user?.email) {
      try {
        await dispatch(updateQuantity({ productId: productId?._id, action: "increase" }));
        dispatch(fetchCartItems());
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(increaseQuantity({ productId }));
    }
  };
  const handleRemove = async (productId) => {
    if (user && user?.email) {
      try {
        const response = await axiosInstance.post("/api/v1/cart/remove-from-cart", { productId: productId?._id });

        dispatch(removeFromCart({ productId: productId?._id }));

      } catch (error) {
        console.log("error", error?.response?.data.message || error.message);
      }
    } else {
      dispatch(removeFromCart({ productId: productId }));
    }
  };

  const calculateTotals = () => {

    const mrp = items.reduce(
      (acc, item) => {
        const price = item.mattressPrice ? item.mattressPrice : item.productId.price;
        return acc + price * item.quantity;
      },
      0
    );
    const total = items.reduce(
      (acc, item) => {
        const price = item?.mattressFinalPrice ? item?.mattressFinalPrice : item.productId.finalPrice;
        return acc + price * item.quantity;
      },
      0
    );
    const discount = mrp - total;
    setTotals({ total, mrp, discount });
  };


  useEffect(() => {
    if (loading) return;

    if (user && user?.email) {

      dispatch(fetchCartItems());
    } else {
      if (typeof window !== "undefined") {
        const cartData = localStorage.getItem("cart");
        const parsedCart = safeJSONParse(cartData);
        if (parsedCart && Array.isArray(parsedCart)) {
          dispatch(setCartFromLocalStorage(parsedCart));
        }
      }
    }
  }, [loading]);

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
              Add to Cart
            </li>
          </ol>
        </div>
      </nav>

      <div className="container cart-page mt-4 mb-4">
        <h5 className="fw-bold mb-4 text-center">My Cart ({items?.length})</h5>
        <div className="row">
          {/* Left side */}
          <div className="col-lg-8">
            {items?.map((item, index) => (
              <div key={index} className="cart-item d-flex mb-4 pb-3">
                {/* <Link
                  href={`/Pages/products/${item?.productId ? item?.productId : item?.productId?._id}`}
                  className="text-decoration-none"
                > */}
                <Image
                  src={item?.image || item?.productId?.images[0] || "jsonholder.img"}
                  alt={item?.name || item?.productId?.productName}
                  width={180}
                  height={140}
                  className="rounded"
                />
                {/* </Link> */}
                <div className="flex-grow-1 leftTextSec">
                  <h6 className="fw-semibold">{item?.name || item?.productId?.productName}</h6>
                  <p className="text-muted small mb-2">{item?.description}</p>
                  <div className="d-flex align-items-center justify-content-between gap-4">
                    <div className="d-flex align-items-center">
                      <span className="me-2">Qty.</span>
                      <div className="qty-box">
                        <button
                          onClick={() =>
                            handleDecrease(item.productId, item.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{item?.quantity}</span>
                        <button
                          onClick={() =>
                            handleIncreaseQuantity(
                              item.productId,
                              item.quantity,
                              item.stock
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="price-text">
                      ₹{item?.mattressFinalPrice * item?.quantity || item?.productId?.finalPrice * item?.quantity}{" "}
                      <del className="ms-2">₹{item?.mattressPrice * item?.quantity || item?.productId?.price * item?.quantity}</del>{" "}
                      <span className=" ms-2">
                        {item?.discount || item?.productId?.discount}% OFF
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    {/* <span className="me-3 text-muted action-btn">
                      <i className="bi bi-heart"></i> Save For Later
                    </span> */}
                    <span
                      className="text-danger action-btn"
                      onClick={() => handleRemove(item.productId)}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="bi bi-trash"></i> Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="col-lg-4">
            <div className="price-summary shadow-sm rounded-3">
              <h6 className="fw-bold mb-3">
                Price Detail{" "}
                <span className="text-muted">({items?.length} Items)</span>
              </h6>
              <div className="d-flex justify-content-between mb-2">
                <span>MRP</span>
                <span>₹{totals.mrp}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Discount</span>
                <span className="">- ₹{totals.discount}</span>
              </div>
              {/* <div className="d-flex justify-content-between mb-2">
                <span>Coupon (SUMMER25)</span>
                <span className="themeColor">- ₹1,000</span>
              </div> */}
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-6">
                <span>Total Payable</span>
                <span>₹{totals.total}</span>
              </div>
              <small className="text-muted">Inclusive of all taxes</small>
              <p className=" small mt-3">
                Congratulations! You’ve Just Saved ₹{totals.discount} On Your
                Order.
              </p>
              {/* <p className="small text-muted">EMI Starting ₹2,419/Month</p> */}
              <Link href="/Pages/Checkout">
                <button className="btn btn-block text-light place-order-btn mt-2">
                  PLACE ORDER
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
