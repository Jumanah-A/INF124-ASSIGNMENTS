<%@ page import="javax.xml.crypto.Data" %>
<%@ page import="com.project.store.DatabaseHelper" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.HashMap" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
    <head>
        <link rel="stylesheet" href="styles.css">
        <script src="https://kit.fontawesome.com/a904bba290.js" crossorigin="anonymous"></script>
        <script src="checkout.js"></script>
    </head>

    <body>
        <div class='navbar'>
            <a href="index.jsp" class='logo'>Fashend</a>
            <a >Checkout</a>
        </div>
        <div id="cart-container">
            <h2>Shopping Cart</h2>
            <%
                List<String> cartlist = (ArrayList<String>) session.getAttribute("cart");
                HashMap<String, Integer> items = new HashMap<String, Integer>();
                if (cartlist != null) {
                    for (String item : cartlist) {
                        if (items.containsKey(item)) {
                            int quantity = items.get(item);
                            items.put(item, quantity + 1);
                        } else {
                            items.put(item, 1);
                        }
                    }
                } else {
                    %><h3>Cart Empty</h3><%
                }
                Double totalPrice = 0.0;

                DatabaseHelper databaseHelper = new DatabaseHelper();
                Connection connection = databaseHelper.getConnection();
                Statement statement = connection.createStatement();

                for (String item : items.keySet()) {
                    String sql = "SELECT * FROM products WHERE id=" + item;
                    ResultSet rs = statement.executeQuery(sql);
                    while (rs.next()) {
                        // String id = rs.getString("id");
                        String title = rs.getString("title");
                        String image = rs.getString("image");
                        Double price = rs.getDouble("price");
                        Double quantityPrice = items.get(item) * price;
                        totalPrice += quantityPrice;
                        %>

                        <div class="cart-item">
                            <div class="cart-item-img">
                                <img src="<%=image%>">
                            </div>
                            <div class="cart-item-details">
                                <h3><%=title%></h3>
                                <p>Quantity: <%=items.get(item)%></p>
                            </div>
                            <div class="cart-item-price">
                                <h3><%=String.format("$%.2f", quantityPrice)%></h3>
                            </div>
                        </div>
                        <%
                    }
                }
            %>
            <h3 id="shipping-price">Shipping: $0</h3>
            <h3 id="tax-price">Tax: $0</h3>
            <input value="<%=totalPrice%>" id="totalPriceInput" type="hidden">
            <h3 id="total-price">Total Price: <%=String.format("$%.2f", totalPrice)%></h3>
        </div>
        <% if (cartlist != null) { %>
        <div id="form-container">
            <form id="form" name="orderForm" action="processOrder" method="POST">
                <div id="form-grid">
                    <div><label for="fname"><i class="fa fa-user"></i> First Name:</label>
                        <br>
                        <input type="text" id="fname" name="fname">
                    </div>

                    <div>
                        <label for="lname"><i class="fa fa-user"></i> Last Name:</label>
                        <br>
                        <input type="text" id="lname" name="lname">
                    </div>

                    <div>
                        <label for="phone">Phone number:<small>123-456-7890</small></label>
                        <br>
                        <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required>
                    </div>
                    <div>
                        <label for="email">Email Address</label>
                        <br>
                        <input id="email" type="text" name="email"
                        pattern="^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                        required>
                    </div>
                    <div>
                        <label for="address">Street Address: 123 N Main Street</label>
                        <br>
                        <input id="address" type="text" name="address" pattern="[0-9]+\s[a-zA-Z\s]+" required>
                    </div>

                    <div>
                        <label for="city">City</label>
                        <br>
                        <input type="text" id="city" name="city" pattern="[a-zA-Z\s]+" required>
                    </div>

                    <div>
                        <label for="zipcode">Zipcode</label>
                        <br>
                        <input type="text" id="zipcode" name="zipcode" pattern="[0-9]{5}" onblur="completeTax(this.value)" required>
                    </div>

                    <div>
                        <label for="state">State</label>
                        <br>
                        <input type="text" list="states" id="state" name="state" oninput="completeState(this.value)" pattern="[a-zA-Z\s]+" required>
                        <datalist id="states">
                        </datalist>
                    </div>

                    <div>
                        <label for="shipping">Shipping</label><br>
                        <select name="shipping" id="shipping" onchange="updateShipping(this.value)">
                            <option value="standard" selected="selected">Standard (Free)</option>
                            <option value="overnight">Overnight ($10)</option>
                            <option value="expedited">2-days expedited ($7)</option>
                        </select>
                    </div>

                    <div>
                        <label for="credit-card">Credit Card: <small>1234-1234-1234-1234</small></label>
                        <br>
                        <input type="text" id="credit-card" name="credit-card" pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}"
                            placeholder="1234-1234-1234-1234" required>
                    </div>

                    <div>
                        <label for="cvc">CVC/CVV</label>
                        <br>
                        <input type="text" id="cvc" name="cvc" pattern="[0-9]{3,4}" placeholder="123" required>
                    </div>

                    <div>
                        <label for="expiration">Expiration: <small>MM/YY</small></label>
                        <br>
                        <input type="text" id="expiration" name="expiration" pattern="^(0[1-9]|1[0-2])\/{1}([0-9]{2})$" placeholder="MM/YY" required>

                    </div>

                </div>

                <input type="submit" value="Send Order" id="submit">
            </form>
        </div>
        <% } %>
    </body>
</html>
