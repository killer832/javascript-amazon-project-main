
/* export class searchItem {
  searchValue;
  searchValueClick;
  constructor(searchbar,searchbutton){
    this.searchValue = document.querySelector(searchbar)
    this.searchValueClick = document.querySelector(searchbutton)
  }
  
} */


export function searchItem(){
  let searchValue = document.querySelector('.js-search-bar');
  let searchValueClick = document.querySelector('.js-search-button');
  
      searchValue.addEventListener('keydown',(a)=>{
      if (a.key === 'Enter'){
        search()
      }
    })
    searchValueClick.addEventListener('click',() => {
      search()
    })
    function search(){
    return window.location.href = 
      `amazon.html?query=${searchValue.value}`;
  }
}

/* export class SearchItem {
  searchInput;
  searchButton;

  constructor(searchbar, searchbutton) {
    this.searchInput = document.querySelector(searchbar);
    this.searchButton = document.querySelector(searchbutton);
  }

  init() {
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.search();
      }
    });

    this.searchButton.addEventListener('click', () => {
      this.search();
    });
  }

  search() {
    window.location.href =
      `amazon.html?query=${this.searchInput.value}`;
  }
}
 */