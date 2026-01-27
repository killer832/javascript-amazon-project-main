
class Cart{
  cartItem ;
  localStorageKey;
  constructor(localStorageKey){
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }
  loadFromStorage() {
        this.cartItem = JSON.parse(localStorage.getItem(this.localStorageKey));
          if (!this.cartItem){
            this.cartItem =[{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:2,
            deliveryOptionId:'1'
          }, {
            productId:  "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity:1,
            deliveryOptionId:'2'
        }];
        }
      };
          saveToStorage(){
        localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItem))
      };

      addTocart(productId,selectedQuantity){
        let matchItem;
        this.cartItem.forEach((cartItem)=>{
          if (productId === cartItem.productId){
            matchItem = cartItem
          }
        })
        if (matchItem){
          matchItem.quantity += selectedQuantity
        }
        else{
          this.cartItem.push({
          productId:productId,
          quantity:selectedQuantity,
          deliveryOptionId:'1'
        })
        }
        this.saveToStorage() 
      };
      displayMessage(productId){
      const added = document.querySelector(`.js-added-to-cart-${productId}`);
      setTimeout(() => {
        added.classList.add('js-added-message')
        setTimeout(()=>{
          added.classList.remove('js-added-message')
        },2000)
      },50);
      };
      removeFromCart(productId){
        let newCart =[];
        this.cartItem.forEach((cartItem)=>{
          if(cartItem.productId !== productId){
            newCart.push(cartItem)
          };
        });
        this.cartItem = newCart;
        this.saveToStorage();
      };
      updateDeliveryOption(productId,deliveryOptionId){
      let matchItem;
      this.cartItem.forEach((cartItem)=>{
          if (productId === cartItem.productId){
            matchItem = cartItem
          };
        });
        matchItem.deliveryOptionId = deliveryOptionId;
        
        this.saveToStorage()
      };

          updateCartQuantity(productId,newCartQuantity,quantityInput){
        let matchItem;
        this.cartItem.forEach((cartItem)=>{
            if (productId === cartItem.productId){
              matchItem = cartItem
            }
          });
    
          if (newCartQuantity<0){
            return alert('Enter a valid value')
            
          }
          if (newCartQuantity>50){
            return alert('value should be less then 50')
            
          }
    
          if (quantityInput.value === ''){
            return
          }
          if (newCartQuantity===0){
            this.removeFromCart(productId)
            this.saveToStorage()
            return
          }
          matchItem.quantity = newCartQuantity;
          
          this.saveToStorage();
    
      }
      
}

const cart = new Cart('cart-oop') 
const businessCart = new Cart('businessCart-oop')

console.log(cart)
console.log(businessCart)