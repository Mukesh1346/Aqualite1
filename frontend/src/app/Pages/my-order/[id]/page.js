// app/my-orders/[id]/page.jsx
"use client";
import Image from 'next/image';
import pic1 from "@/app/Components/assets/icon1.jpg";
import pic2 from "@/app/Components/assets/icon2.webp";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { axiosInstance } from '@/app/utils/axiosInstance';

const dummyOrder = {
  orderId: "M-T1265",
  date: "20/12/2025",
  status: "Delivered",
  payment: "Paid via UPI",
  products: [
    {
      id: 1,
      name: "Drawing Room Sofa",
      image: pic1,
      price: 5000,
      quantity: 1,
    },
    {
      id: 2,
      name: "Luxury Chair Set",
      image: pic2,
      price: 3200,
      quantity: 2,
    },
  ],
};

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({})
  // const order = dummyOrder; // later replace with real data
  const totalAmount = order?.items && order?.items?.reduce((total, item) => total + (item.mattressFinalPrice || item.productId.finalPrice * item.quantity), 0);
  console.log("XXXCC:=>", order, totalAmount)
  const fetchOrderDetails = async () => {
    try {
      const response = await axiosInstance(`/api/v1/order/get-order-by-id/${id}`)
      setOrder(response?.data?.order)
    } catch (error) {
      console.log("Error fetching order details:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch order details.");
    }
  }
  useEffect(() => {
    fetchOrderDetails();
  }, [id]);
  return (
    <div className="container py-5">
      <h2 className="mb-4">Order Details</h2>

      <div className="mb-4 p-3 bg-light rounded">
        <p><strong>Order ID:</strong> {order?.orderUniqueId}</p>
        <p><strong>Order Date:</strong> {order?.createdAt && new Date(order?.createdAt).toLocaleString()}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`badge ${order?.orderStatus === "Placed" ? "bg-primary" :
            order?.orderStatus === "Confirmed" ? "bg-info" :
              order?.orderStatus === "Shipped" ? "bg-warning" :
                order?.orderStatus === "Delivered" ? "bg-success" :
                  order?.orderStatus === "Cancelled" ? "bg-danger" :
                    "bg-secondary"
            }`}>
            {order?.orderStatus}
          </span>
        </p>
        <p><strong>Payment Method:</strong> {order?.paymentStatus}</p>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Details</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {order?.items?.map((product) => (
              <tr key={product?.productId._id}>
                <td>
                  <Image src={product?.productId?.images[0]} alt={product?.productId.productName} width={80} height={80} className="rounded" />
                </td>
                <td>{product?.productId.productName}</td>
                <td>₹{product?.mattressFinalPrice || product?.productId.finalPrice}</td>
                <td>{product?.quantity}</td>
                <td>₹{product?.mattressFinalPrice || product?.productId.finalPrice * product?.quantity}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="text-end"><strong>Grand Total:</strong></td>
              {/* <td><strong>₹{totalAmount}</strong></td> */}
              <td><strong>₹{order?.totalAmount}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
