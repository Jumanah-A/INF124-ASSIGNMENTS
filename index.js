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

var mens_clothes;
var womens_clothes;

fetch("https://fakestoreapi.com/products/category/men's clothing")
            .then(res => res.json())
            .then(json => mens_clothes = json)
            .then(
                fetch("https://fakestoreapi.com/products/category/women's clothing")
                .then(resp => resp.json())
                .then(newJson => womens_clothes = newJson)
                .then(displayProducts)
            )

function displayProducts() {
    let products = mens_clothes.concat(womens_clothes)
    console.log(products)
    let section = document.getElementById('products-section');
    products.forEach((product) => {
        let product_card = document.createElement('div'); 
        product_card.setAttribute('class', 'product')

        let product_img = document.createElement('img');
        product_img.setAttribute('src', product.image);
        product_img.setAttribute('id', 'product'+product.id)
        
    
        let product_title = document.createElement('h3'); 
        product_title.setAttribute('class', 'product-title')
        product_title.innerHTML = product.title;

        let product_price = document.createElement('h4');
        product_price.setAttribute('class', 'product-price');
        product_price.innerHTML = product.price;

        product_card.appendChild(product_img);
        product_card.appendChild(product_title);
        product_card.appendChild(product_price);
        
        for (let i=0; i<Math.round(product.rating.rate); i++) {
            let star = document.createElement('i');
            star.setAttribute('class', 'fa-solid fa-star');
            product_card.appendChild(star);
        }
        for (let i=0; i<5-Math.round(product.rating.rate); i++) {
            let star = document.createElement('i');
            star.setAttribute('class', 'fa-regular fa-star');
            product_card.appendChild(star);
        }

        let review = document.createElement('span');
        review.innerHTML = "&nbsp;" + product.rating.count + " reviews"
        review.setAttribute('class', "review-count")
        product_card.appendChild(review)

        section.appendChild(product_card);
    });
}

// fetch('https://api.storerestapi.com/products')
// .then(response => response.json())
// .then(json => console.log(json))