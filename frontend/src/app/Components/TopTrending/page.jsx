"use client";
import React, { use, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './toptrending.css';

// Import your category images
import sofaImg from   '@/app/Components/assets/icon1.jpg';         
import bedImg from   '@/app/Components/assets/icon2.webp';         
import diningImg from   '@/app/Components/assets/icon3.webp';        
import sofaBedImg from   '@/app/Components/assets/icon4.jpg';        
import tvUnitImg from   '@/app/Components/assets/icon6.webp';        
import bookshelfImg from   '@/app/Components/assets/icon6.webp';        
import coffeeTableImg from   '@/app/Components/assets/icon7.webp';        
import studyTableImg from   '@/app/Components/assets/icon8.jpg';        
import decorImg from   '@/app/Components/assets/icon9.webp';         
import furnishingImg from   '@/app/Components/assets/icon10.webp';        
import lampImg from   '@/app/Components/assets/icon11.webp';         
import saleImg from   '@/app/Components/assets/icon12.webp';         
import { fetchCategories } from '@/app/redux/slice/categorySllice';
import { useDispatch, useSelector } from 'react-redux';
import { generateSlug } from '@/app/utils/generate-slug';

const CategoryNav = () => {

  const dispatch = useDispatch();

 const {categories,loading} = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
<>

    <section className="category-nav-section">
      <div className="container">
        <div className="row justify-content-center">
            <div className='HeadingSection text-center'>
                <h2 className='toptrandheading'>Top Picks For You </h2>
                <p className='fw-3'>Impressive Collection for Your Dream Home</p>

            </div>
            {
              !loading ? (
                categories?.filter((category) => category?.isCollection===true)?.map((category, index) => (
                  <div key={index} className="col-4 col-sm-4 col-md-2 m-3 ">
                    <Link 
                    href={`/Pages/category/${generateSlug(category?.categoryName, category?._id)}`}
                      className="category-link"
                    >
                      <div className="category-image-container">
                        <Image 
                        width={300}
                        height={300}
                          src={category?.categoryImage} 
                          alt={category?.categoryName}
                          className="category-image"
                        />
                      </div>
                      <div className="category-name">{category?.categoryName }</div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>Loading...</p>
                </div>
              )
            }
          
        </div>
      </div>
    </section>
    </>
    );
};

export default CategoryNav;









// import Link from 'next/link';
// import './toptrending.css'
// import pic1 from '@/app/Components/assets/pic1.jpg'
// import pic2 from '@/app/Components/assets/pic2.jpg'
// import pic3 from '@/app/Components/assets/pic3.jpg'
// import pic4 from '@/app/Components/assets/pic4.jpg'
// import pic5 from '@/app/Components/assets/pic5.jpg'
// import pic6 from '@/app/Components/assets/pic6.jpg'
// import pic7 from '@/app/Components/assets/pic7.png'
// import pic8 from '@/app/Components/assets/pic8.png'
// import pic9 from '@/app/Components/assets/pic9.png'
// import pic10 from '@/app/Components/assets/pic11.jpg'
// import Image from 'next/image';

// const furnitureCategories = [
//   { name: 'Sofa Sets', image: pic1 , link: '/sofa-sets' },
//   { name: 'Beds', image: pic2 , link: '/beds' },
//   { name: 'Dining Table Sets', image: pic3 , link: '/dining-tables' },
//   { name: 'Sofa Cum Beds', image: pic4, link: '/sofa-cum-beds' },
//   { name: 'TV Units', image: pic1, link: '/tv-units' },
//   { name: 'Book Shelves', image: pic1, link: '/book-shelves' },
//   { name: 'Coffee Tables', image: pic1, link: '/coffee-tables' },
//   { name: 'Study Tables', image: pic1, link: '/study-tables' },
//   { name: 'Home Decor', image: pic1, link: '/home-decor' },
//   { name: 'Home Aqualite Mattres', image:pic1, link: '/home-furnishing' },
//   { name: 'Lamps & Lightings', image: pic1, link: '/lamps-lightings' },
//   { name: 'Sale', image:pic1, link: '/sale' },
// ];

// const FurnitureSection = ({ categories }) => {
//   return (
//     <div className="container py-5">
//       <h2 className="mb-4 text-center">Explore Our Aqualite Mattres Categories</h2>
//       <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-4">
//         {categories.map((category) => (
//           <div key={category.name} className="col">
//             <Link href={category.link} className="text-decoration-none">
//               <div className="card h-100 shadow-sm rounded">
//                 <Image
//                   src={category.image}
//                   alt={category.name}
//                   className="card-img-top  rounded-top"
//                   style={{ objectFit: 'cover', height: '180px' }}
//                 />
//                 <div className="card-body text-center">
//                   <h6 className="card-title mb-0 fw-bold text-dark">{category.name}</h6>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const HomePage = () => {
//   return (
//     <div>
//       {/* Other components of your homepage */}
//       <FurnitureSection categories={furnitureCategories} />
//       {/* More components */}
//     </div>
//   );
// };

// export default HomePage;