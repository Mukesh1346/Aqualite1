"use client";
import React, { useEffect } from "react";
import styles from "./wishlist.css";
import {
  FaTrashAlt,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { IoIosHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlistFromServer,
  loadWishlistFromLocalStorage,
  removeFromWishlistToLocal,
  removeFromWishlistToServer,
} from "@/app/redux/slice/wislistSlice";
import { NoItem } from "@/app/utils/NoItem";

const Page = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const hanldeRemoveWishlist = (productId) => {
    if (user && user?.email){

      dispatch(removeFromWishlistToServer(productId));
    }else{
      dispatch(removeFromWishlistToLocal(productId));
    }
  };

  useEffect(() => {
    if (user && user?.email) {
      dispatch(getWishlistFromServer());
    } else {
      dispatch(loadWishlistFromLocalStorage());
    }
  }, [dispatch,user]);
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
              Wishlist
            </li>
          </ol>
        </div>
      </nav>

      <div className={styles.wishtlistMain}>
        <div className="container">
          <div className="text-center pt-2">
            <IoIosHeartEmpty className="wishlighicon" />
            <h1 className="text-center">My Wishlist</h1>
          </div>

          {/* Desktop Table View */}
          <div className="d-none d-md-block">
            {wishlist?.products && wishlist?.products?.length > 0 ? (
              <table className={`table table-bordered ${styles.wishlistTable}`}>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Product Name</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlist?.products?.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td className="d-flex align-items-center gap-3">
                        <Link href={`/Pages/products/${item?._id}`}>
                          <Image
                            src={item?.images[0]}
                            width={60}
                            height={60}
                            alt={item?.productName}
                            className={styles.productImg}
                          />
                        </Link>
                        {item?.productName}
                      </td>
                      <td>
                        <del className="text-muted me-2">{item?.price}</del>
                        <span className="fw-semibold">{item?.finalPrice}</span>
                      </td>
                      <td>
                        <small
                          className={
                            item?.stock > 0 ? "text-success" : "text-danger"
                          }
                        >
                          {item?.stock > 0 ? "In Stock" : "Out of Stock"}
                        </small>
                      </td>
                      <td
                        className="text-center"
                        onClick={() => hanldeRemoveWishlist(item?._id)}
                      >
                        <FaTrashAlt className={styles.trashIcon} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <NoItem name={"Wishlist"} />
            )}
          </div>

          {/* Mobile Card View - 2 per row */}
          <div className="d-md-none py-3">
            <div className="row g-3">
              {wishlist?.products && wishlist?.products?.length > 0 ? (
                wishlist?.products?.map((item) => (
                  <div className="col-6" key={item._id}>
                    <div className={`card h-100 ${styles.wishlistCard}`}>
                      <div className="card-body wishlist-card-body">
                        <div className="text-center">
                          <Link href={`/Pages/products/${item?._id}`}>
                            <Image
                              src={item?.images[0]}
                              width={120}
                              height={120}
                              alt={item?.productName}
                              className={`${styles.mobileProductImg} mb-2`}
                            />
                            <h5 className="mb-1 ">{item?.productName}</h5>
                          </Link>
                          <p className="mb-1">
                            <del className="text-muted me-2">{item?.price}</del>
                            <span className="fw-semibold">
                              {item?.finalPrice}
                            </span>
                          </p>
                        </div>
                        <FaTrashAlt className="trashIcon" />
                        <div className=" text-center">
                          <p className="m-0">
                            <small
                              className={
                                item?.stock > 0 ? "text-success" : "text-danger"
                              }
                            >
                              {item?.stock > 0 ? "In Stock" : "Out of Stock"}
                            </small>
                          </p>
                          {/* <p className="m-0">
                          <small>Added on: {item?.createdAt?.tolocaleString()}</small>
                        </p> */}
                          <div className="d-flex flex-column align-items-center">
                            {/* <input
                            type="number"
                            defaultValue={1}
                            className={`form-control text-center mb-2 ${styles.quantityInput}`}
                          /> */}
                            <button
                              className={`btn btn-sm text-light w-100 actionBtn`}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <NoItem name={"Wishlist"} />
              )}
            </div>
          </div>

          {/* Share Section */}
          <div
            className={`d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4 mb-3 ${styles.shareSection}`}
          >
            <div className="d-flex gap-3 align-items-center">
              <strong>Share on:</strong>
              <FaFacebookF className={styles.socialIcon} />
              <FaTwitter className={styles.socialIcon} />
              <FaPinterestP className={styles.socialIcon} />
              <FaEnvelope className={styles.socialIcon} />
              <FaWhatsapp className={styles.socialIcon} />
            </div>
            {/* <div className="d-flex gap-2">
              <button
                className={`btn text-light actionBtn ${styles.addAllBtn}`}
              >
                ADD ALL TO CART
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
