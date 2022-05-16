function completeState(input) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            var states = result.split(",").slice(0,-1);
            console.log(states);

            var statesList =  document.getElementById("states");
            statesList.innerHTML = "";
            states.forEach(function(state) {
                var possibleState = document.createElement('option');
                possibleState.value = state;
                statesList.append(possibleState);
            });
        }
    }

    xhr.open("GET", "getState?input=" + input, true);
    xhr.send();
}

function completeTax(input) {
    console.log("hello")
    console.log(input)
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            console.log(result)
            console.log("hello in completetax");

            var taxPrice =  document.getElementById("tax-price");
            taxPrice.innerHTML="Tax: $"+result;
        }
    }

    xhr.open("GET", "getTax?input=" + input, true);
    xhr.send();
}

function updateShipping(shipping) {
    var shipping_price = document.getElementById("shipping-price");
    var totalPrice = parseFloat(document.getElementById("totalPriceInput").value);
    var totalPriceElement = document.getElementById("total-price");

    if (shipping == "standard") {
        shipping_price.innerHTML = "Shipping: $0";
        totalPrice += 0;
    } else if (shipping == "overnight") {
        shipping_price.innerHTML = "Shipping: $10";
        totalPrice += 10;
    } else if (shipping == "expedited") {
        shipping_price.innerHTML = "Shipping: $7";
        totalPrice += 7;
    }
    totalPriceElement.innerHTML = "Total Price: $" + totalPrice;


}
