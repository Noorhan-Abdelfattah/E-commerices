import React from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
export default function Layout({userData , setuserData}) {
  let navigate = useNavigate()

  function Logout()
  {
    localStorage.removeItem ('userToken')
    setuserData(null)
    navigate('/login')
  }
  

 


  return<>
<div className='pt-5'>
  <Navbar Logout={Logout} userData={userData} />
<div className='container'>
  <Outlet></Outlet>
</div>
<Footer/>
</div>

 
  </>
}
