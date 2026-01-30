import { renderOrderSummery } from "./checkout/orderSummer.js";
import { renderPaymentSummery } from "./checkout/paymentSummer.js";
import {loadProducts,loadProductsFetch} from  '../data/products.js'
//import '../data/cart-class.js'
import '../data/backend.js'



 loadProductsFetch().then(()=>{
  renderOrderSummery()
  renderPaymentSummery()
})

/*
loadProducts(()=>{
  renderOrderSummery()
  renderPaymentSummery()
  })*/

