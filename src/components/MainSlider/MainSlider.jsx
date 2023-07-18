
import React from 'react'
import Slider from "react-slick";
import slider1 from "./images/grocery-banner.png"
import slider2 from "./images/grocery-banner-2.jpeg"
import slider3 from "./images/slider-2.jpeg"
import slider4 from "./images/slider-image-2.jpeg"
import slider5 from "./images/slider-image-3.jpeg"

export default function MainSlider() {

 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll:1,
   arrows:false
  };




  return<>

  <div className="row gx-0 py-5">
    <div className="col-md-9">
      <Slider {...settings}>
       
      <img className='w-100' height={400} src={slider1} alt=''/>
       <img className='w-100' height={400} src={slider2} alt=''/>
       <img className='w-100' height={400} src={slider3} alt=''/>
      
          </Slider>
    </div>
    <div className="col-md-3">
    <img className='w-100' height={200} src={slider4} alt=''/>
    <img className='w-100' height={200} src={slider5} alt=''/>
    </div>
  </div>
  
  </>
}
