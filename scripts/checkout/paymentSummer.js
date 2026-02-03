import { getProduct } from "../../data/products.js"
import { cart ,resetCart} from "../cart.js"
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js"
import { formatCurrency } from "../utils/money.js";
import { totalCartQuantity } from "../utils/cartQuantity.js";
 import{addOrder} from '../placeOrder.js'

export function renderPaymentSummery(){
  let paymentSummeryHTML= '';
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
   const product = getProduct(cartItem.productId);
  productPriceCents += product.priceCents*cartItem.quantity;
  const deliveryOption =  getDeliveryOption(cartItem.deliveryOptionId)
  shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTax = productPriceCents+shippingPriceCents;
  const taxCents = totalBeforeTax * 0.1;
  const totalPriceCentes = totalBeforeTax + taxCents;
    
  paymentSummeryHTML +=
  ` 
    
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${totalCartQuantity()}):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalPriceCentes)}</div>
      </div>

      <button class="js-place-order-button place-order-button button-primary">
        Place your order
      </button>
    
  `
  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummeryHTML;

 const placeOrderButton = document.querySelector('.js-place-order-button')
 try{

    if (!Array.isArray(cart) || cart.length === 0) {
      console.warn('Cart is empty');
      return;
    }
    placeOrderButton.addEventListener('click',async ()=> {
      const response = await fetch('https://supersimplebackend.dev/orders',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

          cart: cart
        })
        
      });
      if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const order = await response.json()
      addOrder(order)

      window.location.href ='orders.html'
      resetCart()
    })
  }catch(error){
    console.log('Unexpected error. Please try again')
  }
  
  
}

