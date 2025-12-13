"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import './collection.css'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubCategories } from '@/app/redux/slice/subCategorySlice'
import { generateSlug } from '@/app/utils/generate-slug'

const Page = () => {

  const dispatch = useDispatch()

  const { subCategories } = useSelector((state) => state.subCategory)

  useEffect(() => {
    dispatch(fetchSubCategories())
  }, [dispatch])

  return (
    <section className="collection-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="toptrandheading m-0">Collections</h2>
          <p className="subtitle">Explore our premium Aqualite Mattres collections</p>
        </div>

        <div className="collection-grid">
          {subCategories
            ?.filter((category) => category?.isCollection === true)
            ?.map((item) => (
              <div className="collection-card" key={item?._id}>
                <div className="image-wrapper">
                  <Link
                    href={`/Pages/products/subcategory/${generateSlug(
                      item?.subCategoryName
                    )}/${item?._id}`}
                  >
                    <Image
                      src={item?.collectionImage}
                      alt={item?.subCategoryName}
                      fill
                      sizes="(max-width: 768px), (max-width: 1200px) 50vw, 33vw"
                      className="collection-img"
                    />
                  </Link>
                </div>
                <h3 className="collection-title">{item?.subCategoryName}</h3>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default Page
