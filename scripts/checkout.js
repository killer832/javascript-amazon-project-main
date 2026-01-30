import { renderOrderSummery } from "./checkout/orderSummer.js";
import { renderPaymentSummery } from "./checkout/paymentSummer.js";
import {loadProducts} from  '../data/products.js'
//import '../data/cart-class.js'
import '../data/backend.js'

new Promise((resolve)=>{
  loadProducts(()=>{
    resolve()
  })
}).then(()=>{
   renderOrderSummery()
  renderPaymentSummery()
})

/*
loadProducts(()=>{
  renderOrderSummery()
  renderPaymentSummery()
})*/