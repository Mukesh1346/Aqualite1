"use client";
import React from "react";
import styles from "./CustomSizePopup.module.css";

export default function CustomSizePopup({ open, onClose }) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeBtn} onClick={onClose}>
          &times;
        </span>

        <h2 className={styles.popUpFormTitle}>Custom Mattress Size</h2>
        <p >Please enter your custom size and contact details.</p>

        <form className={styles.form}>
          <label>Custom Size (e.g., 78x60 Inch)</label>
          <input type="text" placeholder="Enter size" />

          <label>Name</label>
          <input type="text" placeholder="Your Name" />

          <label>Phone</label>
          <input type="text" placeholder="Your Phone Number" />

          <button className={styles.submitBtn}>Submit</button>
        </form>
      </div>
    </div>
  );
}
