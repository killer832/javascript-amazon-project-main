import { orders } from '../placeOrder.js'
import { getProduct, loadProductsFetch } from '../../data/products.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {searchItem} from './search.js'



async function renderTracking() {
  let trackHTML='';
  await loadProductsFetch()
  const url = new URL(window.location.href)
  const orderId = url.searchParams.get('orderId')
  const productId = url.searchParams.get('productId')
    orders.forEach(async (order) => {
    const productOrderId = order.id;
    if (productOrderId === orderId) {
      order.products.forEach((e) => {
        const itemId = e.productId
        if (productId === itemId) {
          const product = getProduct(productId)
          const orderTime = order.orderTime;
          const arrivingTime = e.estimatedDeliveryTime;
          const width =  remainingTime(orderTime,arrivingTime);
          const formatted = dayjs(arrivingTime).format('dddd, MMMM D')
          const quantity = e.quantity;
          const image = product.image
          const name = product.name

           trackHTML += `
        <div class="order-tracking">
          <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
          </a>

          <div class="delivery-date">
            Arriving on ${formatted}
          </div>

          <div class="product-info">
            ${name}
          </div>

          <div class="product-info">
            Quantity: ${quantity}
          </div>

          <img class="product-image" src="${image}">

          <div class="progress-labels-container">
            <div class="progress-label">
              Preparing
            </div>
            <div class="progress-label js-progress-label">
              Shipped
            </div>
            <div class="progress-label">
              Delivered
            </div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar js-progress-bar"></div>
          </div>
        </div>
      `
      document.querySelector('.js-main').innerHTML = trackHTML;
      document.querySelector('.js-progress-bar').style.width = `${width}%`;
      const labels = document.querySelectorAll('.progress-label')
      labels.forEach((label) =>{
        label.classList.remove('current-status')
      })
      if (width<50){
        labels[0].classList.add('current-status')
      }
      else if (width < 100){
        labels[1].classList.add('current-status')
      }
      else{
        labels[2].classList.add('current-status')
      }
    }
    
  })
}
})


}

renderTracking()
searchItem()
function  remainingTime(orderTime, arrivingTime) {
  const today = dayjs()
  const orderDate = dayjs(orderTime)
  const deliveryDate = dayjs(arrivingTime)
  if (!orderDate.isValid() || !deliveryDate.isValid()) {
    console.error('Invalid date:', orderTime, arrivingTime)
    return 0
  }

  const totalMs = deliveryDate.diff(orderDate)
  const passedMs = today.diff(orderDate)

  if (totalMs <= 0) return 0

  const percentage = (passedMs / totalMs) * 100
  return Math.min(Math.max(Number(percentage.toFixed(2)), 0), 100)
}
