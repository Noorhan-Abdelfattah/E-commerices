import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { cartContext } from '../../context/CartContext';


export default function Checkout() {

let {onlinePayment, cartId}=useContext(cartContext)

 async function handleSubmit(values) {
console.log(values);
let response= await onlinePayment(cartId,values) 
if (response?.date?.status==='success') 
  console.log(response.data.session.url);
  window.location.href =response.data.session.url;

console.log(response);
}

  let formik =useFormik({

    initialValues:{
     details:'',
      city:'',
      phone:''
    },
    onSubmit : handleSubmit

  })

  return<>
  
  <div className="w-50 mx-auto py-5">
   
<form onSubmit={formik.handleSubmit}>

<label htmlFor="details" >details :</label>
<input className="form-control mb-2" onChange={formik.handleChange} value={formik.values.details} type="text" name="details" id="details" />

<label htmlFor="city" >city :</label>
<input  className="form-control mb-2" onChange={formik.handleChange} value={formik.values.city} type="text" name="city" id="city" />

<label htmlFor="phone" >Phone :</label>
<input  className="form-control mb-2" onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" />

<button  type="submit" className="btn bg-main text-white w-100">Pay</button>


</form>
  </div>
  
  
  </>
}
























