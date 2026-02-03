//import {products} from  '../data/products.js'
import {totalCartQuantity } from "./utils/cartQuantity.js"

export  function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart))
  }
  
export let cart;
loadFromStorage()
export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart){
    cart =
    [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2,
    deliveryOptionId:'1'
    },
    {
    productId:  "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryOptionId:'2'
    }];
  }
}
export function addTocart(productId,selectedQuantity){
    let matchItem;
   
   
    cart.forEach((cartItem)=>{
      if (productId === cartItem.productId){
        matchItem = cartItem
      }
    })
    if (matchItem){
      matchItem.quantity += selectedQuantity
    }
    else{
      cart.push({
      productId:productId,
      quantity:selectedQuantity,
      deliveryOptionId:'1'
    })
    }
    
    saveToStorage() 
}


export function displayMessage(productId){
    
  const added = document.querySelector(`.js-added-to-cart-${productId}`);
  setTimeout(() => {
    added.classList.add('js-added-message')
    setTimeout(()=>{
      added.classList.remove('js-added-message')
    },2000)
  },50);
   
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

export function updateDeliveryOption(productId,deliveryOptionId){
 let matchItem;
 cart.forEach((cartItem)=>{
    if (productId === cartItem.productId){
      matchItem = cartItem
    }
  });
  matchItem.deliveryOptionId = deliveryOptionId;
  
  saveToStorage()
}
export function updateCartQuantity(productId,newCartQuantity,quantityInput){
  let matchItem;
 cart.forEach((cartItem)=>{
    if (productId === cartItem.productId){
      matchItem = cartItem
    }
  });

  if (newCartQuantity<0){
    return alert('Enter a valid value')
    
  }
  if (newCartQuantity>50){
    return alert('value should be less then 50')
    
  }

  if (quantityInput.value === ''){
    return
  }
  if (newCartQuantity===0){
    removeFromCart(productId)
    saveToStorage()
    return
  }
  matchItem.quantity = newCartQuantity;
  
  saveToStorage()

}
export function resetCart() {
  cart = [];
  saveToStorage();
}
