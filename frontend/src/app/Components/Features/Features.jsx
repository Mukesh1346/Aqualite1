import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineDangerous } from "react-icons/md";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { TbCalendarDue } from "react-icons/tb";
import './features.css'

export default function Features() {
    const features = [
        {id:1 , title:"free & fast shipping", image:<TbTruckDelivery />},
        {id:2 , title:"100 Nights Risk free Trial", image:<MdOutlineDangerous />},
        {id:3 , title:"15 Years warranty", image:<MdOutlineLibraryBooks/>},
        {id:4 , title:"No Cost EMIs", image:<TbCalendarDue  />},
    ]
  return (
    <>
   <section className='mainFeatureSection'>
   <div className='container'>
        <div className='FeaturesSection'>
           { features.map((item,index)=>(
                   <div className='FeatureCardSection' key={index}>
                         <div className='fs-1'>{item.image}</div>
                         <div className=''>{item.title}</div>
                   </div>
           ))
            
           }
        </div>

      </div>
   </section>
    </>
  )
}
