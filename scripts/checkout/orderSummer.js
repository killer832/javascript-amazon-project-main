import { cart,removeFromCart,updateDeliveryOption,updateCartQuantity } from "../cart.js"
import { formatCurrency } from "../utils/money.js"
import { totalCartQuantity } from "../utils/cartQuantity.js"
import {products,getProduct} from  '../../data/products.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { deliveryOptions,getDeliveryOption } from "../../data/deliveryOptions.js"
import{renderPaymentSummery} from '../checkout/paymentSummer.js'
export function renderOrderSummery (){

  let orderSummeryHTML = '';
  
  
  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    
    const matchItem = getProduct(productId);
  
    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);
    
    const today = dayjs()
    const todayFormat = today.add(deliveryOption.deliveryDays,'day')
    const dateString = todayFormat.format('dddd, MMMM D')

    orderSummeryHTML +=
      `<div class="cart-item-container js-cart-item-container-${matchItem.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchItem.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchItem.name}
            </div>
            <div class="product-price">
            $${formatCurrency(matchItem.priceCents)}
            </div>
            <div class="product-quantity"            >
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}
                </span>
              </span>
              <span class=" js-update-quantity-link update-quantity-link link-primary"
              data-product-id-link="${matchItem.id}">
                Update
              </span>
              <input class= "quantity-input quantity-input-${matchItem.id}" type= "Number" min="0" value="1" max="50">
              <span class="js-save-quantity-link save-quantity-link link-primary"
                 data-product-id="${matchItem.id}">Save</span>
              <span class="js-delete-quantity-link delete-quantity-link link-primary"
              data-product-id="${matchItem.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionHTML(matchItem,cartItem)}
          </div>
        </div>
    </div>    
    `
  })

  function deliveryOptionHTML(matchItem,cartItem){
    let html = '' ;
    deliveryOptions.forEach((deliveryOption)=>{
      const today = dayjs()
      const todayFormat = today.add(deliveryOption.deliveryDays,'day')
      const dateString = todayFormat.format('dddd, MMMM D')
      const priceString = deliveryOption.priceCents === 0
       
      ? 'FREE'
      :` $${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId
      

      html += `

        <div class="delivery-option js-delivery-option"
        data-product-id = "${matchItem.id}"
        data-delivery-option-id = "${deliveryOption.id}"
        >
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchItem.id}">
          <div>
            <div class="delivery-option-date">
             ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>

      `
    })
    
    return html
  }
  

  function updateHeaderCartItem(){
    document.querySelector('.js-return-to-home-link').innerHTML = `${totalCartQuantity()} items`
  }

  document.querySelector('.js-order-summary').innerHTML = orderSummeryHTML;
    document.querySelectorAll('.js-delete-quantity-link')
    .forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId
        removeFromCart(productId)

        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        
        container.remove()
        renderPaymentSummery()
        updateHeaderCartItem()
      })
      updateHeaderCartItem()
    });

   
     document.querySelectorAll('.js-update-quantity-link')
    .forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productIdLink
        
        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        container.classList.add('is-editing-quantity')
        document.querySelector('.js-save-quantity-link')
          .addEventListener('click',()=>{
           container.classList.remove('is-editing-quantity') 
           const quantityInput  = document.querySelector(`.quantity-input-${productId}`)
           const newCartQuantity = Number(quantityInput.value)
           updateCartQuantity(productId,newCartQuantity,quantityInput)
            renderOrderSummery()
            renderPaymentSummery()
            updateHeaderCartItem()
          })
      })
      
    });


    document.querySelectorAll('.js-delivery-option')
      .forEach((element)=>{
        element.addEventListener('click',()=>{
          const {productId,deliveryOptionId } = element.dataset;
          updateDeliveryOption(productId,deliveryOptionId)
          renderOrderSummery()
          renderPaymentSummery()
        });
      });
    
}
