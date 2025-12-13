import Image from 'next/image'
import React from 'react'
import './coustomerservice.css'
import pic1 from '@/app/Components/assets/CoustomerService.avif'
import Certification from '@/app/Components/Certifications/Certification'

export default function CoustomerService() {
  return (
    <>
      <section className='container'>
        <div className='CoustomerServiceMainSec'>
            <div className=''>
            <div className='CoustomerServiceImageSec'>
                <Image src={pic1} alt="" className='ServiceIcon'/>

            </div>

            <div>
                   <h2 className='CoustomerServiceTitle'>Coustomer Service</h2>
                   <h2 className='CoustomerServiceSubTitle' >Excellence Award - 2024 ESCDA, France</h2>
            </div>
            <div className='ServiceFeature'>
                <span className='bg-secondary spanFeature p-1'>#1 Comfort</span>
               <span className='bg-secondary spanFeature p-1'>#1 Support</span>
               <span className='bg-secondary spanFeature p-1'>#1 Value for Price Paid</span>
               <span className='bg-secondary  spanFeature p-1'>#1 Warranty</span>
               <span className='bg-secondary spanFeature p-1'>#1 Durability</span>
            </div>

  
      <Certification/>
            </div>
        </div>


      </section>

      
    </>
  )
}
