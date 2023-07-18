import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";


export default function Register() 
{
  let navigate = useNavigate();
  const [isLoding, setisLoding] = useState(false)
  const [messageError, setmessageError] = useState('');

async function handleRegister(values) {
  setisLoding(true)
 let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values) 
 .catch ((errr)=>{
  setisLoding(false)
  setmessageError (` ${ errr.response.data.errors.param } : ${ errr.response.data.errors.msg } `)

 
 })

 if (data.message ==='success') 
 {
  navigate('/login')
  setisLoding(false)
 }


}
function validate (values) 
{
  let errors ={}

  if (!values.name) {
          errors.name = "Name is required";
        } else if (values.name.length < 3) {
          errors.name = "Name minlength is 3";
        }
    
        if (!values.email) {
          errors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = "Email is invalid";
        }
    
        if (!values.password) {
          errors.password = "Password is required";
        } else if (!/^[A-Z][a-z0-9]{5,10}$/.test(values.password)) {
          errors.password = "Password must start with uppercase";
        }
    
        if (!values.rePassword) {
          errors.rePassword = "Repassword is required";
        } else if (values.password !== values.rePassword) {
          errors.rePassword = "Repassword and password don't match";
        }
    
        if (!values.phone) {
          errors.phone = "Phone is required";
        } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
          errors.phone = "Phone must be a valid Egyptian number";
        }





  return errors;
}
  let formik =useFormik({

    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validate,
    onSubmit : handleRegister

  })

  return<>
  
  <div className="w-75 mx-auto py-4">
      <h3>Register Now :</h3>

{messageError? <div className="alert alert-danger"> {messageError} </div>:null} 
  
 


<form onSubmit={formik.handleSubmit}>

<label htmlFor="name" >Name :</label>
<input onBlur={formik.handleBlur} className="form-control mb-2" onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" />
{formik.errors.name && formik.touched.name ?<div className="alert alert-danger">{formik.errors.name}</div>:null}



<label htmlFor="email" >Email :</label>
<input onBlur={formik.handleBlur} className="form-control mb-2" onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" />
{formik.errors.email && formik.touched.email ?<div className="alert alert-danger">{formik.errors.email}</div>:null}

<label htmlFor="password" >Password :</label>
<input onBlur={formik.handleBlur} className="form-control mb-2" onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password " />
{formik.errors.password && formik.touched.password ?<div className="alert alert-danger">{formik.errors.password}</div>:null}

<label htmlFor="rePassword" >rePassword :</label>
<input onBlur={formik.handleBlur} className="form-control mb-2" onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" />
{formik.errors.rePassword && formik.touched.rePassword ?<div className="alert alert-danger">{formik.errors.rePassword}</div>:null}

<label htmlFor="phone" >Phone :</label>
<input onBlur={formik.handleBlur} className="form-control mb-2" onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" />
{formik.errors.phone && formik.touched.phone ?<div className="alert alert-danger">{formik.errors.phone}</div>:null}

{isLoding?<button  type="button" className="btn bg-main text-white"><i className="fas fa-spinner fa-spin"></i></button>
:<button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white">Register</button>}


</form>
  </div>
  
  
  </>
}






























