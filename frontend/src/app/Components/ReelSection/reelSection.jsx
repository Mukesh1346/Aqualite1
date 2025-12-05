"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ReelSection.module.css"; // CSS Module
import Link from "next/link";
import toast from "react-hot-toast";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { addToCart, AddToCartToServer } from "@/app/redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";



export default function ReelSection() {
  const [videoData, setVideos] = useState([])
  const videoRefs = useRef([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const containerRef = useRef(null);
const router = useRouter();
  const handleMouseEnter = (index) => {
    if (expandedIndex !== null) return; // Don't play on hover if a video is expanded
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === index) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  };

  const handleMouseLeave = () => {
    if (expandedIndex !== null) return; // Don't pause on leave if a video is expanded
    videoRefs.current.forEach((video) => video && video.pause());
  };

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      // If clicking the already expanded video, collapse it
      setExpandedIndex(null);
    } else {
      // Expand the clicked video
      setExpandedIndex(index);
      // Play the video when expanded
      videoRefs.current[index]?.play();
      // Pause all other videos
      videoRefs.current.forEach((video, i) => {
        if (video && i !== index) video.pause();
      });
    }
  };

  // Close expanded video when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        expandedIndex !== null
      ) {
        setExpandedIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expandedIndex]);

  useEffect(() => {
    const handleAutoPlay = () => {
      const isSmallScreen = window.innerWidth <= 768;
      videoRefs.current.forEach((video) => {
        if (video) {
          if (isSmallScreen && expandedIndex === null) {
            video.play().catch((e) => {
              console.warn("Mobile autoplay failed:", e);
            });
          } else if (!isSmallScreen && expandedIndex === null) {
            video.pause();
          }
        }
      });
    };

    handleAutoPlay();
    window.addEventListener("resize", handleAutoPlay);

    return () => {
      window.removeEventListener("resize", handleAutoPlay);
    };
  }, [expandedIndex]);

  const fetchVideos = async () => {
    try {
        const response = await axiosInstance.get('/api/v1/video/get-all-videos');
        if (response.status === 200) {
            setVideos(response?.data?.videos);
            console.log(response?.data?.videos);
            
        }
    } catch (error) {
        toast.error('Error fetching videos');
        console.error('Error fetching videos:', error);
    }
};  

const {user} = useSelector((state) => state.auth);
const dispatch = useDispatch();

const handleAddToCart=(e,product)=>{
  e.stopPropagation();
  let quantity = 1;
  
  if (quantity > product.stock) {
    toast.error("Out of stock");
    return;
  }

  if(user?.email){
    dispatch(AddToCartToServer({productId:product._id,quantity}))
    toast.success("Product added to cart",{
      position: "bottom-right",
    })}
    else{
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
      })
    );
    toast.success("Product added to cart", {
      position: "bottom-right",
    });
  }
}
  useEffect(() => {
    fetchVideos();
}, []);
  return (
    <section className="reel-section mt-3" ref={containerRef}>
  <div className="container">
    <Swiper className="pt-3 pb-5"
      modules={[Navigation, Pagination]}
      spaceBetween={15}
      pagination={{ clickable: true }}
      // pagination={false}
      breakpoints={{
        320: { slidesPerView: 2 },
        576: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        992: { slidesPerView: 5 },
        1200: { slidesPerView: 6 },
      }}
    >
      {videoData.map((item, index) => (
        <SwiperSlide key={index}>
          <div
            className="d-flex flex-column align-items-center position-relative"
            onClick={() => toggleExpand(index)}
          >
            <div
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`${styles.videoContainer} ${
                expandedIndex === index ? styles.expanded : ""
              } ${
                expandedIndex !== null && expandedIndex !== index
                  ? styles.shrunken
                  : ""
              }`}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={item?.videoUrl}
                muted
                loop
                playsInline
                className={`${styles.videoElement} rounded shadow-sm`}
              />
              <div
                className={`position-absolute bottom-0 start-0 w-100 p-2 bg-dark d-flex bg-opacity-75 text-white justify-content-center rounded-bottom ${styles.overlay}`}
              >
                <div className="ms-2 d-grid">
                  <p className="small mb-1">{item?.productId?.productName}</p>
                  <p className="fw-bold mb-1">₹{item?.productId?.finalPrice}</p>
                  <div className="d-flex align-items-center">
                    {/* <button
                      className="btn btn-sm"
                      style={{ background: "var(--brown)", color: "white" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(e, item?.productId);
                      }}
                    >
                      Add to Cart
                    </button> */}
                     <button
                      className="btn btn-sm"
                      style={{ background: "var(--brown)", color: "white" }}
                      onClick={(e) => {
                        e.stopPropagation();
                       router.push(`/Pages/products/${item?.productId?._id}`);
                      }}
                    >
                     View Product
                    </button>
                    <i
                      className={`fa fa-eye ms-3 ${styles.cursorPointer}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(index);
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>

  );
}















// "use client";

// import { useEffect, useRef, useState } from "react";
// import styles from "./ReelSection.module.css"; // CSS Module
// import Link from "next/link";

// const videoData = [
//   {
//     src: "/videos/video1.mp4",
//     price: "$49.99",
//     details: "Elegant Red Dress",
//     description: "Perfect for evening parties.",
//   },
//   {
//     src: "/videos/video2.mp4",
//     price: "$39.99",
//     details: "Casual Summer",
//     description: "Light and comfortable.",
//   },
//   {
//     src: "/videos/video3.mp4",
//     price: "$59.99",
//     details: "Formal Black Gown",
//     description: "Ideal for formal events.",
//   },
//   {
//     src: "/videos/video4.mp4",
//     price: "$29.99",
//     details: "Floral Beach Dress",
//     description: "Great for vacations.",
//   },
//   {
//     src: "/videos/video5.mp4",
//     price: "$45.99",
//     details: "Chic Office Wear",
//     description: "Stylish and professional.",
//   },
//   {
//     src: "/videos/video6.mp4",
//     price: "$34.99",
//     details: "Boho Maxi Dress",
//     description: "Relaxed and trendy.",
//   },
// ];

// export default function ReelSection() {
//   const videoRefs = useRef([]);
//   const [expandedIndex, setExpandedIndex] = useState(null);

//   const handleMouseEnter = (index) => {
//     // Optional hover effect for non-mobile users to play the video
//     videoRefs.current.forEach((video, i) => {
//       if (video) {
//         if (i === index) {
//           video.play();
//         } else {
//           video.pause();
//         }
//       }
//     });
//   };

//   const handleMouseLeave = () => {
//     // Stop video on mouse leave for non-mobile users
//     videoRefs.current.forEach((video) => video && video.pause());
//   };

//   const toggleExpand = (index) => {
//     // Toggle the expanded state for the clicked video
//     setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
//   };

//   useEffect(() => {
//     // Handle autoplay based on screen size (mobile vs desktop)
//     const handleAutoPlay = () => {
//       const isSmallScreen = window.innerWidth <= 768;
//       videoRefs.current.forEach((video) => {
//         if (video) {
//           if (isSmallScreen) {
//             video.play().catch((e) => {
//               console.warn("Mobile autoplay failed:", e);
//             });
//           } else {
//             video.pause();
//           }
//         }
//       });
//     };

//     handleAutoPlay(); // Run on mount

//     window.addEventListener("resize", handleAutoPlay);

//     return () => {
//       window.removeEventListener("resize", handleAutoPlay);
//     };
//   }, []);

//   return (
//     <section className="reel-section mt-3">
//       <div className="container">
//         <div className="row g-3">
//           {videoData.map((item, index) => (
//             <div
//               key={index}
//               className={`col-md-2 col-sm-4 col-6 d-flex flex-column align-items-center position-relative`}
//             >
//               <div
//                 onMouseEnter={() => handleMouseEnter(index)}
//                 onMouseLeave={handleMouseLeave}
//                 className={`${styles.videoContainer} ${expandedIndex === index ? styles.expanded : ""}`}
//               >
//                 <video
//                   ref={(el) => (videoRefs.current[index] = el)}
//                   src={item.src}
//                   muted
//                   loop
//                   playsInline
//                   className={`${styles.videoElement} rounded shadow-sm`}
//                 />
//                 <div
//                   className={`position-absolute bottom-0 start-0 w-100 p-2 bg-dark d-flex bg-opacity-75 text-white justify-content-center rounded-bottom ${styles.overlay}`}
//                 >
//                   <div className="ms-2 d-grid">
//                     <p className="small mb-1">{item.details}</p>
//                     <p className="fw-bold mb-1">{item.price}</p>
//                     <div className="d-flex align-items-center">
//                       <Link href={"/Pages/videosec"}>
//                         <button
//                           className="btn btn-sm"
//                           style={{
//                             background: "var(--brown)",
//                             color: "white",
//                           }}
//                         >
//                           Add to Cart
//                         </button>
//                       </Link>
//                       <i
//                         className={`fa fa-eye ms-3 ${styles.cursorPointer}`}
//                         onClick={() => toggleExpand(index)}
//                       ></i>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
