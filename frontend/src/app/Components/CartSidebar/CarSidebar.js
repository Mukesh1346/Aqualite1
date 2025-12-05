"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdDelete } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  fetchCartItems,
  increaseQuantity,
  removeFromCart,
  safeJSONParse,
  setCartFromLocalStorage,
  updateQuantity,
} from "@/app/redux/slice/cartSlice";
import { axiosInstance } from "@/app/utils/axiosInstance";
import "./CartSidebar.css";

const CartSidebar = ({ isOpen, onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { user, loading } = useSelector((state) => state.auth);

  // Fetch or sync cart
  useEffect(() => {
    if (!loading) {
      if (user?.email) {
        dispatch(fetchCartItems());
      } else {
        const cartData = localStorage.getItem("cart");
        const parsed = safeJSONParse(cartData);
        if (Array.isArray(parsed)) {
          dispatch(setCartFromLocalStorage(parsed));
        }
      }
    }
  }, [loading, user?.email,dispatch]);

  // Disable scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleDecrease = (productId, quantity) => {
    if (quantity <= 1) return;

    if (user?.email) {
      dispatch(updateQuantity({ productId: productId?._id, action: "decrease" }))
        .then(() => dispatch(fetchCartItems()));
    } else {
      dispatch(decreaseQuantity({ productId }));
    }
  };

  const handleIncrease = (productId, quantity, stock) => {
    if (quantity >= stock) return;

    if (user?.email) {
      dispatch(updateQuantity({ productId: productId?._id, action: "increase" }))
        .then(() => dispatch(fetchCartItems()));
    } else {
      dispatch(increaseQuantity({ productId }));
    }
  };

  const handleRemove = async (productId) => {
    if (user?.email) {
      try {
        await axiosInstance.post("/api/v1/cart/remove-from-cart", { productId: productId?._id });
        dispatch(removeFromCart({ productId: productId?._id }));
      } catch (err) {
        console.error(err?.response?.data.message || err.message);
      }
    } else {
      dispatch(removeFromCart({ productId }));
    }
  };

  const total = items.reduce((acc, item) => {
    const price = item?.finalPrice || item?.productId?.finalPrice || 0;
    return acc + price * (item?.quantity || 1);
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />

          {/* 👇 Close cart when cursor moves out */}
          <div onMouseLeave={onClose}>
            <motion.div
              className="cart-sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="cart-header text-center">
                <h5>Your cart <span className="text-muted">({items.length})</span></h5>
                <MdClose className="close-icon" onClick={onClose} />
              </div>

              <div className="cart-body">
                {items.length === 0 ? (
                  <div className="text-center">
                    <p className="text-muted">Your cart is empty.</p>
                    <Image src="/Empty.webp" alt="Empty Cart" width={300} height={300} />
                    <p className="mt-3 fw-bold">What would you like to buy?</p>
                    <div className="d-flex flex-wrap gap-2 justify-content-center">

                      <Link href="/Pages/All-category" className="text-primary"><button className="btn btn-secondary w-100">Shop All Products</button></Link>
                      {/* <Link href="/sofas-seating" className="text-primary">Sofas</Link>
                      <Link href="/kitchen-dining" className="text-primary">Kitchen</Link> */}
                    </div>
                  </div>
                ) : (
                  items.map((item, index) => {
                    const product = item?.productId || item;
                    return (
                      <div className="cart-item d-flex gap-3 py-3 border-bottom" key={index}>
                        <Link href={`/Pages/products/${item?.productId ? item?.productId : item?._id}`}>
                        <Image
                          src={product?.images?.[0] || item?.image || "/placeholder.svg"}
                          width={130}
                          height={100}
                          alt={product?.productName || "Product"}
                          className="rounded"
                        />
                        </Link>
                        <div className="flex-grow-1">
                          <p className="fw-semibold mb-2">{product?.productName || item?.name}</p>
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => handleDecrease(product, item.quantity)}>-</button>
                            <span>{item.quantity}</span>
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => handleIncrease(product, item.quantity, product?.stock)}>+</button>
                          </div>
                          <strong>₹{product?.finalPrice * item.quantity || item?.finalPrice * item.quantity}</strong>
                        </div>
                        <MdDelete
                          className="text-danger fs-5 cursor-pointer"
                          onClick={() => handleRemove(product)}
                        />
                      </div>
                    );
                  })
                )}
              </div>

              {items.length > 0 && (
                <div className="cart-footer">
                  <div className="d-flex justify-content-between mb-3">
                    <span>Total</span>
                    <strong>₹{total}</strong>
                  </div>
                  <button
                    className="btn btn-success w-100"
                    onClick={() => router.push("/Pages/addtocart")}
                  >
                    PLACE ORDER
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
