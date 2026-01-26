import {cart, addTocart,loadFromStorage} from "../../scripts/cart.js";

describe('test suite: addTocart',()=>{
  it('add a existing product to cart',()=>{

  });
  it('adds a new product to cart',()=>{
    
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
   
    loadFromStorage();


    addTocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1)
    console.log(cart)



    expect(cart.length).toEqual(1);

  });
});