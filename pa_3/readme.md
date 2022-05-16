# PA-3 - Group 34
### Members:
Elvis Lin ,  Jumanah Abdulmohsen Almajnouni

### Github
https://github.com/Jumanah-A/INF124-ASSIGNMENTS/tree/master/store


## Layout
- Home/Main Page - Click the **Fashend** link in the navbar to get to the main page. This page displays the products. Clicking on a product navigates to a new page where you can add to cart.
- Checkout - Click the **Checkout** link in the navbar to go to the checkout. It will display the items
in the cart and an order form for you to place the order. 
- About Us Page - Displays overview of business and our team information.
- FAQs Page - Displays frequently asked questions.

## Requirements

- [1] Requirement 1:
  - We reimplemented the home page using JSP (index.jsp). We also chose to reimplement the checkout (checkout.jsp) and the past five orders (latestProducts.jsp) servlets using JSP. We chose to reimplement these two servlets because they both produced a good amount of HTML. The latestProducts.jsp implementation can be found on the bottom of the home page. 
- [2] Requirement 2:
    - We chose to use Ajax to assist the user with filling the order forms. First, we implemented autocomplete capibility by suggesting states as the user types the name of a state. Second, we implemented a feature that obtains the corresponding tax rate based on state and zipcode. This can be found in the checkout page. 
