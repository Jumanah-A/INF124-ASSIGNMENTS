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
    
        let product_title = document.createElement('h3'); 
        product_title.innerHTML = product.title;

        let product_price = document.createElement('h4');
        product_price.innerHTML = product.price;

        product_card.append(product_img);
        product_card.append(product_title);
        product_card.append(product_price)
        section.appendChild(product_card)
    });
}

// fetch('https://api.storerestapi.com/products')
// .then(response => response.json())
// .then(json => console.log(json))