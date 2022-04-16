import { items } from "./data.js";
import { handleProductClick } from "./index.js"
displayProducts();
function displayProducts() {
  let products = items;
  // console.log(products)
  let section = document.getElementById('products-section');
  products.forEach((product) => {
    let productButton = document.createElement('a');
    productButton.setAttribute('href','../pages/product.html?id='+product.id);
    productButton.setAttribute('class', 'product');
    productButton.setAttribute('id', product.id)

    let product_img = document.createElement('img');
    product_img.setAttribute('src', product.image);
    product_img.setAttribute('id', product.id);


    let product_title = document.createElement('h3');
    product_title.setAttribute('class', 'product-title')
    product_title.setAttribute('id', product.id);
    product_title.innerHTML = product.title;

    let product_price = document.createElement('h4');
    product_price.setAttribute('class', 'product-price');
    product_price.setAttribute('id', product.id)
    product_price.innerHTML = product.price;

    productButton.appendChild(product_img);
    productButton.appendChild(product_title);
    productButton.appendChild(product_price);

    for (let i = 0; i < Math.round(product.rating.rate); i++) {
      let star = document.createElement('i');
      star.setAttribute('class', 'fa-solid fa-star');
      productButton.appendChild(star);
    }
    for (let i = 0; i < 5 - Math.round(product.rating.rate); i++) {
      let star = document.createElement('i');
      star.setAttribute('class', 'fa-regular fa-star');
      productButton.appendChild(star);
    }

    let review = document.createElement('span');
    review.innerHTML = "&nbsp;" + product.rating.count + " reviews"
    review.setAttribute('class', "review-count")
    review.setAttribute('id', product.id);
    productButton.appendChild(review)

    section.appendChild(productButton);
  });
}

document.getElementById('1').addEventListener('click', handleProductClick);
document.getElementById('2').addEventListener('click', handleProductClick);
document.getElementById('3').addEventListener('click', handleProductClick);
document.getElementById('4').addEventListener('click', handleProductClick);
document.getElementById('15').addEventListener('click', handleProductClick);
document.getElementById('16').addEventListener('click', handleProductClick);
document.getElementById('17').addEventListener('click', handleProductClick);
document.getElementById('18').addEventListener('click', handleProductClick);
document.getElementById('19').addEventListener('click', handleProductClick);
document.getElementById('20').addEventListener('click', handleProductClick);
