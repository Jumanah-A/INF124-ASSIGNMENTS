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

// var mens_clothes;
// var womens_clothes;

// fetch("https://fakestoreapi.com/products/category/men's clothing")
//             .then(res => res.json())
//             .then(json => mens_clothes = json)
//             .then(
//                 fetch("https://fakestoreapi.com/products/category/women's clothing")
//                 .then(resp => resp.json())
//                 .then(newJson => womens_clothes = newJson)
//                 .then(displayProducts)
//             )


displayProducts();
function displayProducts() {
    let products = items;
    console.log(products)
    let section = document.getElementById('products-section');
    products.forEach((product) => {
    let productButton = document.createElement('div');
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
        
        for (let i=0; i<Math.round(product.rating.rate); i++) {
            let star = document.createElement('i');
            star.setAttribute('class', 'fa-solid fa-star');
            productButton.appendChild(star);
        }
        for (let i=0; i<5-Math.round(product.rating.rate); i++) {
            let star = document.createElement('i');
            star.setAttribute('class', 'fa-regular fa-star');
            productButton.appendChild(star);
        }

        let review = document.createElement('span');
        review.innerHTML = "&nbsp;" + product.rating.count + " reviews"
        review.setAttribute('class', "review-count")
        productButton.appendChild(review)

        section.appendChild(productButton);
    });
}

function handleProductClick(event){
  // console.log("button is pressed")
  // console.log(event.target.id);
  var $allProducts = document.getElementById('current-product-view');
  $allProducts.className = "view"
  var $currentProduct = document.getElementById('all-products-view');
  $currentProduct.className = "view hidden"
  displayProductDetails(event.target.id)
}
// function displayProductDetails(productId)
// {
//   console.log("hi");
//   var current;
//   for(var i=0;i<10;i++)
//   {
//     if(String(items[i].id) === String(productId))
//     {
//       current=items[i];
//       break;
//       // console.log(items[i]);
//     }
//   }
//   document.querySelector('.product-price').innerHTML=current.price;
//   document.querySelector('.product-rating').innerHTML =current.rating;
//   document.querySelector('.product-description').innerHTML =current.description;
//   document.querySelector('.product-name').innerHTML=current.title;
//   document.querySelector('.product-image').setAttribute('src',current.image);
//   console.log(productId)

// }

function displayProductDetails(productId) {
  console.log("hi");
  var current;
  for (var i = 0; i < 10; i++) {
    if (String(items[i].id) === String(productId)) {
      current = items[i];
      break;
      // console.log(items[i]);
    }
  }
  console.log(current.rating)
  document.querySelector('.product-price').innerHTML = "Price: $"+current.price;
  document.querySelector('.product-rating').innerHTML = "Rating: "+current.rating.rate;
  document.querySelector('.product-description').innerHTML = "Description: "+current.description;
  document.querySelector('.product-name').innerHTML = current.title;

  document.querySelector('.product-image').setAttribute('src', current.image);

}
// function switchViews(viewToSwitchTo)
// {

// }



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
