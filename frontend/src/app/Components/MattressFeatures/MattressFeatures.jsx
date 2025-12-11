"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Slide4 from '@/app/Components/assets/Slide1.webp'
import Slide3 from '@/app/Components/assets/Slide2.webp'
import Slide2 from '@/app/Components/assets/Slide3.webp'
import Slide1 from '@/app/Components/assets/Slide4.webp'
import image1 from '@/app/Components/assets/matresspro1.jpg'
import image2 from '@/app/Components/assets/matresspro2.jpg'
import image3 from '@/app/Components/assets/matressBanner1.webp'
import image4 from '@/app/Components/assets/matressBanner3.webp'
import './mattressfeature.css'


export default function MattressFeatures() {
    const [content,setContent]=useState(1)
 

    const data = [
        {id:1,title:"Stability Layer" ,subtitle:""}
    ]

    const handleChange = (num)=>{
  console.log(num)
  setContent(num)

    }

  return (
    <>
     <section>
        <div className='MattressFeaturesMainSec'>
            <div className='container'>
                <div>
                    <h2 className='MattressHeading'>See What Make It Miraculous</h2>
                </div>
                <div className='row'>
                    <div className="col-md-8">
                      <div className='MattressImageSec'>
                        <div className='ImageBlock'>
                            <Image src={Slide1} alt=""  className='MattressImg1 MatterssSlide'/>
                            <Image src={Slide2} alt=""  className='MattressImg2 MatterssSlide'/>
                            <Image src={Slide3} alt=""  className='MattressImg3 MatterssSlide'/>
                            <Image src={Slide4} alt=""  className='MattressImg4 MatterssSlide'/>
                            <div className='SpanOverlay'>
                                <span className='span1'onClick={ ()=>handleChange(1)}>1</span>
                                <span className='span2' onClick={ ()=>handleChange(2)}>2</span>
                                <span className='span3' onClick={ ()=>handleChange(3)}>3</span>
                                <span className='span4' onClick={ ()=>handleChange(4)}>4</span>
                            </div>
                        </div>

                      </div>

                    </div>
                    <div className="col-md-4">
                        { content === 1 ?(
                            <div className='MattressSection'>
                                <div >
                                 <h2 className='mattressTitle' >Two cover options</h2>
                                 <p className='mattressSubtitle'>
                                 Go for a Breathable Knit Cover or a Cooling Quilt Top for plush relief from the heat.</p>
                                <div className='MiniImageSec'>
                                <Image src={image1} alt="samplePic" className='miniImage'/>
                                </div>
                                </div>
                            </div>
                        ):""

                        }
                        { content === 2 ?(
                            <div className='MattressSection'>
                                <div className='MattressDetailsSec' >
                                 <h2 className='mattressTitle'> Comfort layer</h2>
                                 <p className='mattressSubtitle' >
                                
Exclusive breathable foam sleeps cool, with the hug and bounce needed for comfort.</p>
<div className='MiniImageSec'>
                                 <Image src={image2} alt="samplePic" className='miniImage'/>
                                </div>
                                </div>
                            </div>
                        ):""

                        }
                        { content === 3 ?(
                            <div className='MattressSection'>
                                <div >
                                 <h2 className='mattressTitle'>Memory foam recovery layer</h2>
                                 <p className='mattressSubtitle'>
                                 Contours to your body to relieve back, hip, and shoulder pressure. </p>
                                 <div className='MiniImageSec'>
                                 <Image src={image3} alt="samplePic" className='miniImage'/>
                                 </div>
                                 </div>
                            </div>
                        ):""

                        }
                        { content === 4 ?(
                            <div className='MattressSection'>
                                <div >
                                 <h2 className='mattressTitle'>Stability Layers</h2>
                                 <p className='mattressSubtitle'>High density foam base provides signature support and durability for all body types </p>
                                 <div className='MiniImageSec'>
                               
                                 <Image src={image4} alt="samplePic" className='miniImage'/>
                                </div>
                                </div>
                            </div>
                        ):""

                        }

                    </div>

                </div>

            </div>


        </div>

     </section>


    </>
  )
}
