import axios from "axios";
import { useEffect, useState } from "react";

import { createContext } from "react";

export let cartContext = createContext();

export function CartContextProvider(props){
    const [cartId, setcartId] = useState(null)
    const [numOfCartItems, setnumOfCartItems] = useState(0)
   

    async function getCart() {
        let response =await getLoggedUserCart()
        if (response?.data?.status === 'success') 
        {
            setnumOfCartItems(response.data.numOfCartItems)
            setcartId(response.data.data._id)
        }
        console.log(response);
    }

   useEffect(() => {
     getCart();
   
   }, [])
   
    let headers={
        token:localStorage.getItem('userToken')
    }

    function addToCart(productId) {
  return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId
        },{
            headers:headers
        }) 
        .then((Response)=> Response)
        .catch((error)=> error);

    }


    function getLoggedUserCart(productId) {
        return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, 
              {
                  headers:headers
              }) 
              .then((Response)=> Response)
              .catch((error)=> error);
      
          }
      


 function removeItem(productId) {
        return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
              {
                  headers:headers
              }) 
              .then((Response)=> Response)
              .catch((error)=> error);
      
          }



 function updataproductCount(productId , count) {
     return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
     {
        count:count
     },
    {
      headers:headers
    }) 
     .then((Response)=> Response)
     .catch((error)=> error);
    
     }
    


     function clearCard() {
        return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
              {
                  headers:headers
              }) 
              .then((Response)=> Response)
              .catch((error)=> error);
      
          }

         // 64b4635e9203a90033ed2548
function onlinePayment(cartId , shippindAddress) {
 return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
 {
    shippingAddress:shippindAddress
 },
{
 headers:headers
}) 
.then((Response)=> Response)
.catch((error)=> error);

}





    return <cartContext.Provider value={{addToCart , getLoggedUserCart , removeItem , updataproductCount, clearCard , onlinePayment , numOfCartItems , cartId , setnumOfCartItems}}>
        {props.children}
    </cartContext.Provider>
}








