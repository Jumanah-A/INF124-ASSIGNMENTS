import { items } from "./data.js";

displayProductDetails()
function displayProductDetails()
{
  let productId = window.location.href.split('=')[1];
  var current;
  for (var i = 0; i < 10; i++) {
    if (String(items[i].id) === String(productId)) {
      current = items[i];
      break;
    }
  }
  document.querySelector('.product-price').innerHTML = "Price: $" + current.price;
  document.querySelector('.product-rating').innerHTML = "Rating: " + current.rating.rate;
  document.querySelector('.product-description').innerHTML = "Description: " + current.description;
  document.querySelector('.product-name').innerHTML = current.title;
  document.querySelector('.product-image').setAttribute('src', current.image);

}
