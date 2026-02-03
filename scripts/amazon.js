import {products,loadProductsFetch} from  '../data/products.js'
import {cart,addTocart,displayMessage} from  '../scripts/cart.js'   
import{formatCurrency} from './utils/money.js' 
import{totalCartQuantity} from './utils/cartQuantity.js' 
import{renderHeaderAll} from './Header.js'

async function renderProducts(){
  await loadProductsFetch()
  let matchItem ;
  async function initSearch() {
  
    const url = new URL(window.location.href);
    const search = url.searchParams.get('query');

    if (!search) {
      console.log('No search query');
      return;
    }

    const searchItem = search.toLowerCase();

    const results = products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchItem);

      const keywordMatch = product.keywords?.some(keyword =>
        keyword.toLowerCase().includes(searchItem)
      );

      return nameMatch || keywordMatch;
    });

    matchItem = results
  }

  await initSearch()

   let filteredProducts = products;
   
   if (matchItem){
    filteredProducts = matchItem
   }


  let productHtml = ''
  filteredProducts.forEach(product=>{
    productHtml += `    
    <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${(product.rating.count)}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}" >
                <option selected value="1">1</option>
                <option value="2" >2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="js-added-to-cart-${product.id} added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="js-addTocart-button add-to-cart-button button-primary" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
    `
    return product
  })
  let selectedQuantity ;
  document.querySelector('.Js-products-grid').innerHTML = productHtml

  renderHeaderAll()
  document.querySelectorAll('.js-addTocart-button').forEach((button)=>{
    button.addEventListener("click",()=>{

      const productId = button.dataset.productId
        selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        displayMessage(productId)
        addTocart(productId,selectedQuantity)
        // document.querySelector('.js-cart-quantity').innerHTML = totalCartQuantity();
        renderHeaderAll()
        
      })
    })
}
renderProducts();