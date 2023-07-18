import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";


export default function Login({saveUserdata}) 
{

  let navigate = useNavigate();
  const [isLoding, setisLoding] = useState(false)
  // const [messageError, setmessageError] = useState('');

async function handlelogin(values) {
  setisLoding(true)
 let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values) 
//  .catch ((errr)=>{
//   setisLoding(false)
//   setmessageError (` ${ errr.response.data.errors.param } : ${ errr.response.data.errors.msg } `)

 
//  })

 if (data.message ==='success') 
 {
  
  localStorage.setItem('userToken' , data.token)
  saveUserdata();
  navigate('/')
  setisLoding(false)
 }


}
function validate (values) 
{
  let errors ={}

 
    
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
    

  return errors;
}
  let formik =useFormik({

    initialValues:{
      email:'',
      password:'',
    },
    validate,
    onSubmit : handlelogin

  })

  return<>
  
  <div className="w-75 mx-auto py-4">
      <h3>Login Now :</h3>

{/* {messageError? <div className="alert alert-danger"> {messageError} </div>:null}  */}
  
 


<form onSubmit={formik.handleSubmit}>


<label htmlFor="email" >Email :</label>
<input onBlur={formik.handleBlur} className="form-control mb-2" onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" />
{formik.errors.email && formik.touched.email ?<div className="alert alert-danger">{formik.errors.email}</div>:null}


<label htmlFor="password" >password :</label>
<input onBlur={formik.handleBlur} className="form-control mb-2" onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" />
{formik.errors.email && formik.touched.email ?<div className="alert alert-danger">{formik.errors.email}</div>:null}



{isLoding?<button  type="button" className="btn bg-main text-white"><i className="fas fa-spinner fa-spin"></i></button>
:<button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white">Login</button>}


</form>
  </div>
  
  
  </>
}
