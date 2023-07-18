import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Slider from "react-slick";

export default function ProductDetails() {
  const[productDetails,setproductDetails]=useState(null)
  const [isLoading, setisLoading] = useState(false)
  let params =useParams();



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };



  async function getproductDetails(id){
    setisLoading(true);
   let{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
   setproductDetails(data.data)
   setisLoading(false);
  }

  useEffect(()=>{
    getproductDetails(params.id);
  } , [])

  return<>





 <div className="row justify-content-center align-items-center py-3 ">
{isLoading? 
<div className="text-center">
  <i className='fas fa-spin fa-3x fa-spinner text-main'></i>
</div>

 :<>


<div className="col-md-3">
  <Slider {...settings}>
        
{productDetails?.images.map((img)=> <img src={img} />  )}

  </Slider>
   
  </div>
  <div className="col-md-8">
    <h3>{productDetails?.title}</h3>
    <p className='text-muted p-2'>{productDetails?.description}</p>


    <div className="d-flex justify-content-between">
      <span className='text-muted'> {productDetails?.price} EGP </span>
      <span> <i className='fas fa-star rating-color'></i> 
      {productDetails?.ratingsAverage}
      </span>
    </div>
    <button className='w-100 bg-main text-white btn'> +Add </button>
  </div>

</>}

 
 </div>
  </>
}
