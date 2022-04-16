import { items } from "./data.js";

var menuCollapsed = true;

function menuClick() {
    const menu = document.getElementById('menu');

    if (menuCollapsed) {
        menu.style.maxHeight = "100%";
        menuCollapsed = false;
    } else {
        menu.style.maxHeight = "0";
        menuCollapsed = true;
    }
}

export function handleProductClick(event){
  displayProductDetails(event.target.id)
}

function displayProductDetails(productId) {
  var current;
  for (var i = 0; i < 10; i++) {
    if (String(items[i].id) === String(productId)) {
      current = items[i];
      break;
    }
  }
  document.querySelector('.product-price').innerHTML = "Price: $"+current.price;
  document.querySelector('.product-rating').innerHTML = "Rating: "+current.rating.rate;
  document.querySelector('.product-description').innerHTML = "Description: "+current.description;
  document.querySelector('.product-name').innerHTML = current.title;
  document.querySelector('.product-image').setAttribute('src', current.image);

}
