import {products,hello} from  '../data/products.js'


export let cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:2
  },
  {
  productId:  "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1
  }];
export function addTocart(productId,timer){
    let matchItem;
    let cartQuantity =0;
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
        
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity ;
    
    
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
}