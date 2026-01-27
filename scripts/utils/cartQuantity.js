import {cart} from '../cart.js'

export function totalCartQuantity(){
   let cartQuantity = 0;
   cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    
    return cartQuantity
}