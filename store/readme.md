# PA-1 - Group 8
### Members:
Elvis Lin ,  Jumanah Abdulmohsen Almajnouni

### Github
https://github.com/Jumanah-A/INF124-ASSIGNMENTS


## Layout
- Home/Main Page - Click the **Fashend** link in the navbar to get to the main page. This page displays the products. Clicking on a product navigates to a new page and displays details and order form.
- About Us Page - Displays overview of business and our team information.
- FAQs Page - Displays frequently asked questions.

## Requirements
When the user submits a form to order a product, instead of sending an email from the client-side, as you did in first assignment, the request should be sent to a server-side Java Servlet that stores that information in a database table. The form should be validated to prevent insertion of bad data in your database.

- [1] **About Us (about-us.html)** and **FAQs (index.html)** pages provide an overview and additional
- [1] Requirement 1:
  -We created a products table in the MySql database and created two servlets to use that data from the  database  to display the information. The first servlet 'products' delects the data from the backend table to displays all the product in a list. At the bottom the sercond servlet 'lastfive' displays the the lastest 5 products (with a rating functionality that also uses a servlet to acgieve that ) at the bottom of the products list.
- [2] Requirement 2:
    -We created a 'details' servlet to display the selected products details with its asscoaited id number that is passsed as a query string in url. Additionally we used a servlet and the servelet. session to allow the user to add the product to the cart and store it there temporarily so that the user would be able to check out later on.
- [3] Requirement 3:
  - Using servlets and forms the user was able to order a product by filling out a forms where bthe request is handled by the 'order' servlet.
- [4] Requirement 4:
  -when the user heads to the checkout page another form is dispalys to allow the user to insert credit card and other information which is sent to the backend database to be stored. After being successfully stored we used the forawrd feature to forward the order details page.

## Reference
