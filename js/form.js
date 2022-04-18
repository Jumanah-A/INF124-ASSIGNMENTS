

function displayForm(){

    var quantity = document.createElement("select");
    quantity.name = "quantity";
    quantity.id = "quantity"
    quantity.class = "formRowOne"
  
      for (var i = 1; i < 8; i++)
      {
          var option = document.createElement("option");
          option.value = i;
          option.text = i;
          quantity.appendChild(option);
      }
  
    let quantityText = document.createElement("h3");
    quantityText.innerHTML = "Quantity / Shipping";
    quantityText.class = "formRowOne";
    document.body.appendChild(quantityText)
    document.body.append(quantity);
  
    let shipping = document.createElement("label");
    shipping.className = "fa-solid fa-fast-truck";
    shipping.innerHTML = " Shipping";
    shipping.classList.add("class", "formRowLabel");
  
    var shippingInput = document.createElement("select");
    shippingInput.name = "shipping";
    shippingInput.id = "shipping"
    shippingInput.class = "formRowOne"
  
    var shippingOptions = ["Overnight", "2 day expedited", "6 day ground"];
  
    for (const ship of shippingOptions)
      {
          var option = document.createElement("option");
          option.value = ship;
          option.text = ship;
          shippingInput.appendChild(option);
      }
  
    document.body.append(shipping);
    document.body.append(shippingInput);
  
  
  
    let bill = document.createElement("h3");
    bill.innerHTML = "Billing Information";
    bill.class = "formRowOne";
  
    let username = document.createElement("label");
    username.className = "fa fa-user";
    username.innerHTML = " Name";
    username.classList.add("class", "formRowLabel");
  
    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "John Doe";
    nameInput.classList.add("class", "formRowOne");
    nameInput.classList.add("required");
  
    let email = document.createElement("label");
    email.className = "fa fa-envelope";
    email.innerHTML = " Email";
    email.classList.add("class", "formRowLabel");
  
    let emailInput = document.createElement("input");
    emailInput.type = "text";
    emailInput.placeholder = "johndoe@mail.com";
    emailInput.classList.add("class", "formRowOne");
  
    let address = document.createElement("label");
    address.innerHTML = " Address";
    address.className = "fa-solid fa-address-book"
    address.classList.add("class", "formRowLabel");
  
    let addressInput = document.createElement("input");
    addressInput.type = "text";
    addressInput.placeholder = "Address";
    addressInput.classList.add("class", "formRowOne");
  
    let number = document.createElement("label");
    number.innerHTML = " Phone";
    number.className = "fa-solid fa-mobile";
    number.classList.add("class", "formRowLabel");
  
    let numberInput = document.createElement("input");
    numberInput.type="text";
    numberInput.placeholder = "123 456 789";
    numberInput.classList.add("class", "formRowOne");
  
  
    let contactText = document.createElement("h3");
    contactText.innerHTML = "Contact Information";
    contactText.class = "formRowOne";
  
  
  
    document.body.append(bill);
    document.body.append(username);
    document.body.append(nameInput);
    document.body.append(address);
    document.body.append(addressInput);
    document.body.append(contactText);
    document.body.append(number);
    document.body.append(numberInput);
    document.body.append(email);
    document.body.append(emailInput);
  
    let paymentText = document.createElement("h3");
    paymentText.innerHTML = "Payment";
    paymentText.class = "formRowOne";
    document.body.appendChild(paymentText)
  
    let cName = document.createElement("label");
    cName.innerHTML = " Name on Card";
    cName.className = "fa-solid fa-credit-card";
    cName.classList.add("class", "formRowLabel");
  
    let cNameInput = document.createElement("input");
    cNameInput.type = "text";
    cNameInput.placeholder = "John Doe";
    cNameInput.classList.add("class", "formRowOne");
  
    let cNumber = document.createElement("label");
    cNumber.innerHTML = " Card Number";
    cNumber.className = "fa-solid fa-credit-card";
    cNumber.classList.add("class", "formRowLabel");
  
    let cNumberInput = document.createElement("input");
    cNumberInput.type = "text";
    cNumberInput.placeholder = "XXXX XXXX XXXX";
    cNumberInput.classList.add("class", "formRowOne");
  
    let exp = document.createElement("label");
    exp.innerHTML = " Expiration";
    exp.className = "fa-solid fa-caret-right";
    exp.classList.add("class", "formRowLabel");
  
    let expInput = document.createElement("input");
    expInput.type = "text";
    expInput.placeholder = "00/00";
    expInput.classList.add("class", "formRowOne");
  
    let cvv = document.createElement("label");
    cvv.innerHTML = " CVV";
    cvv.className = "fa-solid fa-caret-right";
    cvv.classList.add("class", "formRowLabel");
  
    let cvvInput = document.createElement("input");
    cvvInput.type = "text";
    cvvInput.placeholder = "000";
    cvvInput.classList.add("class", "formRowOne");
  
    document.body.append(cName);
    document.body.append(cNameInput);
    document.body.append(cNumber);
    document.body.append(cNumberInput);
    document.body.append(exp);
    document.body.append(expInput);
    document.body.append(cvv);
    document.body.append(cvvInput);
  
    function submitForm(){
      if (nameInput.value.length == 0 || cNameInput.value.length == 0){
        alert("Name empty");
        return;
      }
  
      if (addressInput.value.length == 0){
        alert("Address empty");
        return;
      }
  
      if (numberInput.value.length == 0){
        alert("Phone empty");
        return;
      }
  
      if (emailInput.value.length == 0){
        alert("Email empty");
        return;
      }
  
      if (cNumberInput.value.length == 0){
        alert("Card number empty");
        return;
      }
  
      if (expInput.value.length == 0){
        alert("Expiration date empty");
        return;
      }
  
      if (cvvInput.value.length == 0){
        alert("CVV empty");
        return;
      }
  
      if (parseInt(numberInput) < 0 | parseFloat(numberInput) > 9999999999){
        alert("Invalid phone number");
        return;
      }
  
      if (parseInt(cNumberInput) < 0 | cNumberInput.value.length < 12){
        alert("Invalid card number");
        return;
      }
  
      if (parseInt(cvvInput) < 0 | parseInt(cvvInput) > 999 | cvvInput.value.length < 3){
        alert("Invalid CVV");
        return;
      }
  
      if (!mailInput.includes("@")){
        alert("Invalid email");
        return;
      }
  
    }
  
    let submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit";
    submitButton.id = "order";
    submitButton.className = "orderButton";
    submitButton.addEventListener("click", function(){
      submitForm();
    });
  
    document.body.append(submitButton);
  
  }