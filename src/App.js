import logo from './logo.svg';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Card from './components/Card/Card';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Brands from './components/Brands/Brands';
import Logout from './components/Logout/Logout';
import About from './components/About/About';
import Register from './components/Register/Register';
import Categories from './components/Categories/Categories';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import {  useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import {CartContextProvider} from './context/CartContext'
import Checkout from './components/Checkout/Checkout';
import { Offline, Online } from 'react-detect-offline';










function App() {

useEffect(() => {

  if (localStorage.getItem('userToken') !== null) 
 {
  setuserData(); 
 }
}, [])


const [userData, setuserData] = useState(null);

function saveUserdata() {
   let encodedToken= localStorage.getItem('userToken');
  let decodedToken= jwtDecode(encodedToken);
  setuserData(decodedToken);
}


let routers = createBrowserRouter([
  {path:'' , element:<Layout setuserData={setuserData} userData={userData}/> ,
  children:[
    {index:true , element: <ProtectedRoute><Home/></ProtectedRoute> },
    {path:'Cart', element: <ProtectedRoute><Card/></ProtectedRoute>},
    {path:'ProductDetails/:id', element: <ProductDetails/>},
    {path:'Brands', element:<ProtectedRoute><Brands/> </ProtectedRoute>},
    {path:'Products', element:  <ProtectedRoute><Products/></ProtectedRoute>},
    {path:'About' , element: <ProtectedRoute><About/></ProtectedRoute>},
    {path:'Checkout' , element: <ProtectedRoute><Checkout/></ProtectedRoute>},
    {path:'Categories' , element: <ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'Register' , element:<Register/>},
    {path:'Login' , element:<Login saveUserdata={saveUserdata} />},
    {path:'Logout' , element:<Logout/>},
    {path:'*' , element:<NotFound/>}


  ]}
])

  return <>
<CartContextProvider>
<Offline> <div className='network'> Only show offline (surprise!) </div></Offline>

    <RouterProvider router={routers}></RouterProvider>
    <Toaster/>
</CartContextProvider> 




 



   
 



  </>
}

export default App;
