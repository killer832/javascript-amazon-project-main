import {orders} from './placeOrder.js'
import {getProduct,loadProductsFetch} from '../data/products.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { formatCurrency } from './utils/money.js';
// import {render} from './Header.js'
import { totalCartQuantity } from './utils/cartQuantity.js';

export async function renderOrder() {
 
  await loadProductsFetch();
  
    
 let orderHTML = ''
  orders.forEach(order => {
    const orderId = order.id;
    
    const orderTime = order.orderTime
    const orderedTimeFormat = dayjs(orderTime).format('MMMM D')
    const totalCost = formatCurrency(order.totalCostCents);
    let productsHTML = '';

    order.products.forEach(product =>{
    const arrivingTime = product.estimatedDeliveryTime;
    const formatted = dayjs(arrivingTime).format('MMMM D')
    const quantity = product.quantity;
    const productId = product.productId
    const item = getProduct(productId)
  
    productsHTML+=
      
  ` 
        <div class="product-image-container">
          <img src="${item.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${item.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formatted}
          </div>
          <div class="product-quantity">
            Quantity: ${quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <button class="track-package-button js-track-package-button button-secondary"
          data-order-id = ${orderId}
          data-product-id = ${productId}
          >
            Track package
          </button>
        </div>
    
    ` 
      });

      orderHTML+=
    ` <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderedTimeFormat}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total: $${totalCost}</div>
            <div></div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${orderId}</div>
        </div>
      </div>
    <div class="order-details-grid ">
      ${productsHTML} 
    </div>
    </div>
  `
  document.querySelector('.js-orders-grid').innerHTML = orderHTML;

  }); 


  document.querySelectorAll('.js-track-package-button')
    .forEach(button =>{
    button.addEventListener('click',()=>{
      const productId = button.dataset.productId
      const orderId = button.dataset.orderId
      window.location.href =`tracking.html?orderId=${orderId}&productId=${productId}`
    })
  })
  
}

renderOrder()
document.querySelector('.js-cart-quantity').innerHTML = totalCartQuantity()

