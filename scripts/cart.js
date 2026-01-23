import {products,hello} from  '../data/products.js'
import {totalCartQuantity } from "./utils/cartQuantity.js"

  function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart))
  }
  
export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart){
  cart =
  [{
   productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
   quantity:2
   },
   {
   productId:  "15b6fc6f-327a-4ec4-896f-486349e85a3d",
   quantity:1
   }];
}
export function addTocart(productId){
    let matchItem;
   
    let selectedQuantity ;

    selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value)
    
    cart.forEach((item)=>{
      if (productId === item.productId){
        matchItem = item
      }
    })
    if (matchItem){
      matchItem.quantity += selectedQuantity
    }
    else{
      cart.push({
      productId:productId,
      quantity:selectedQuantity
    })
    }
        
    
    document.querySelector('.js-cart-quantity').innerHTML = totalCartQuantity() ;
    
    
    
    const added = document.querySelector(`.js-added-to-cart-${productId}`);
    setTimeout(() => {
      added.classList.add('js-added-message')
      setTimeout(()=>{
        added.classList.remove('js-added-message')
      },2000)
    },50);
    saveToStorage() 
}
 export function removeFromCart(productId){
  let newCart =[];

  cart.forEach((cartItem)=>{

    if(cartItem.productId !== productId){
      newCart.push(cartItem)
    }
  })

    
  
  cart = newCart
  saveToStorage()
}