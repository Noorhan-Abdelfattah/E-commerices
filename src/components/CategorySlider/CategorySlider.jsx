import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Slider from "react-slick";
export default function CategorySlider() {

  const [categories, setcategories] = useState([])
  const [isLoading, setisLoading] = useState(false)
  async function getcategories()
   {
    setisLoading(true)
   let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
   setcategories(data.data);
   setisLoading(false)
  }

  useEffect(()=>{

    getcategories();
  },[])


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll:1
  };


  return<>
 
{isLoading?<div className="text-center">
  <i className='fas fa-spin fa-2x fa-spinner text-main'></i>
</div>:<>

<Slider {...settings}>
        
        {categories?.map((category)=>  <div  key={category._id}> 
        <img className='w-100' height={250} src={ category.image} />
        <h2 className='h6 pt-2'>{category.name}</h2>
         </div>  )}
        
          </Slider>



</>}

 
  </>
}
