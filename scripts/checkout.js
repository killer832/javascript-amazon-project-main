import { renderOrderSummery } from "./checkout/orderSummer.js";
import { renderPaymentSummery } from "./checkout/paymentSummer.js";
import {loadProductsFetch} from  '../data/products.js'
//import '../data/cart-class.js'
import '../data/backend.js'

  async function loadPage(){
  try{
    await loadProductsFetch()

    renderOrderSummery()
    renderPaymentSummery()
  }
    catch(error){
      console.log('Somthing went wrong. Please try leater.')
      console.log(error)
    }
}

loadPage()



/*  loadProductsFetch().then(()=>{
  renderOrderSummery()
  renderPaymentSummery()
}) */

/*
loadProducts(()=>{
  renderOrderSummery()
  renderPaymentSummery()
  })*/

