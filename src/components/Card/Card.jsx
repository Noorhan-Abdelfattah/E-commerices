import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/CartContext'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";


export default function Card() {
let {getLoggedUserCart , removeItem , updataproductCount , clearCard}=useContext(cartContext)
const [isLoading, setisLoading] = useState(false)
const [cartDetails, setcartDetails] = useState(null)

async function getcart() 
{
  setisLoading(true)
  let response = await getLoggedUserCart();
  if (response?.data?.status==="success") {
    setisLoading(false)
    setcartDetails(response.data.data)
   console.log(response);
 }

}

 async function deletItem(productId) {
  let response = await removeItem(productId);
  setcartDetails(response.data.data)
toast.success('product successfully Removed')
  
}

async function updateproudectQuantity(productId , count) {
  let response = await updataproductCount(productId , count);
  setcartDetails(response.data.data)
toast.success('product successfully counte Updated')
  
}


async function clearUserCart() {
  let response = await clearCard();
  setcartDetails(response.data.data)
toast.success('product successfully Removed')
   console.log(response);
}


useEffect ( ()=> {
  getcart();
},[]);

  return<>

<Helmet>
<title>Cart Details</title>
</Helmet>

  {isLoading?<div className="text-center">
  <i className='fas fa-spin fa-2x fa-spinner text-main'></i>
</div>:<>
{cartDetails?
<div className="bg-main-light p-4 my-4">

<div className="col-md-12 d-flex justify-content-between">

<div>
  <h3>Shop cart :</h3>
<h6 className='text-main'>Total cart Price : {cartDetails.totalCartPrice} EGP</h6>
</div>
 <div>
 <button onClick={()=> clearUserCart() } className='btn bg-main text-white ' > Clear Cart </button>
 </div>

</div>

{cartDetails.products.map((product)=> <div key={product.product._id} className='row border-bottom py-2 my-2 align-items-center'>

<div className="col-md-1">
<img src={product.product.imageCover} className='w-100' alt="" />
</div>

<div className="col-md-11 d-flex justify-content-between">
<div>
  <h6>{product.product.title}</h6>
<h6 className='text-main'>price : {product.price}</h6>
<button onClick={()=> deletItem(product.product._id) } className='btn m-0 p-0'> <i className='fa-regular mx-2 text-main fa-trash-can' ></i>Remove</button>
</div>

<div>
  <button onClick={()=> updateproudectQuantity(product.product._id ,product.count+1 ) } className='btn border-main btn-sm'>+</button>
  <span className='mx-2'>{product.count}</span>
  <button onClick={()=> updateproudectQuantity(product.product._id ,product.count-1 ) } className='btn border-main btn-sm'>-</button>
</div>

</div>



</div>)}

<button className='btn  w-100 border-main ' >
  <i className="fa-brands fa-cc-amazon-pay"></i>
  <Link  to={'/Checkout'}> Checkout</Link>
  
 
</button>
</div>: null}

</>


}


  </>
}
