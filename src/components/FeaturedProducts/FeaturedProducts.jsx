import React, {  useContext, useState } from 'react'
import style from './FeaturedProducts.module.css';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/CartContext';
import { toast } from 'react-hot-toast';



export default function FeaturedProducts() {

  const [products, setProducts] = useState([])
  let {addToCart , setnumOfCartItems}=useContext(cartContext);


async function addproduct(productId)
 {  
 
  let response =await addToCart(productId);
  if (response?.data?.status==="success") 
  { setnumOfCartItems(response.data.numOfCartItems)

     toast.success(response.data.message , {duration:2000})
  }
  else{
    toast.error(response.message, {duration:2000})

  }
 
  console.log(response);
}


  const [isLoading, setisLoading] = useState(false)
  async function getProudects()
   {
    setisLoading(true)
   let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
   setProducts(data.data);
   setisLoading(false)
  }

  useEffect(()=>{

    getProudects();
  },[])
  return<>

  

 <div className="row">

{isLoading?
<div className="text-center">
  <i className='fas fa-spin fa-2x fa-spinner text-main'></i>
</div>:<>


{products.map((products) => <div key={products._id} className="col-md-2">
  <div className="product cursor-pointer px-2 py-4">
<Link to={`/productDetails/${products._id}`}>

    <img className='w-100 ' src={products.imageCover} alt=''/>
    <span className='text-main fw-bold font-sm'>{products.category.name}</span>
    <h3 className='h6 fw-bolder'>{products.title.split (' ').slice(0,2).join(' ')}</h3>
    <div className="d-flex justify-content-between">
      <span className='text-muted'> {products.price} EGP </span>
      <span> <i className='fas fa-star rating-color'></i> 
      {products.ratingsAverage}
      </span>
    </div>
    </Link>
    <button onClick={()=> addproduct (products._id)} className='w-100 bg-main text-white btn'> +Add </button>
    
  </div>
</div> )}


</>}



 </div>
  </>
}
