package com.example.store;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mysql.cj.xdevapi.PreparableStatement;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.*;
import javax.servlet.http.HttpSession;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;

@WebServlet(name = "orderDetails", value = "/orderDetails")
public class OrderDetails extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();

        String first = req.getParameter("fname");
        String last = req.getParameter("lname");
        String phone = req.getParameter("lname");
        String email = req.getParameter("email");
        String address = req.getParameter("address");
        String city = req.getParameter("city");
        String zipcode = req.getParameter("zipcode");
        String state = req.getParameter("state");
        String shipping = req.getParameter("shipping");
        String creditCard = req.getParameter("credit-card");

        writer.println(
                "<html><head><link rel='stylesheet' href='styles.css'><link rel='stylesheet' href='//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css'><script src='https://kit.fontawesome.com/a904bba290.js' crossorigin='anonymous'></script></head><body>");
        writer.println(
                "<div class='navbar'><a href='products' class='logo'>Fashend</a><a href='checkout'>Checkout</a></div>");
        writer.println("<div id='confirmation'>");
        writer.println("<h1>Order Submitted!</h1>");
        writer.println("<hr>");
        writer.println("<h2>Order Summary: </h2>");
        writer.println("<p>Hi " + first + " " + last + ",</p>");
        writer.println("<p>Thank you for your order! Your order has been confirmed and will be shipping soon!</p>");
        writer.println("<br><br>");
        writer.println("<p>Email: " + email + "</p>");
        writer.println("<p>Address: " + address + " " + city + " " + zipcode + " " + state + "</p>");
        writer.println("<p>Shipping Method: " + shipping + "</p>");
        writer.println("<p>Credit Card: xxxx-xxxx-xxxx-" + creditCard.split("-")[2] + " </p>");

        HttpSession session = req.getSession();

        // Place items into dictionary so we can find the quantity of each item in cart
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
        }
        Double totalPrice = 0.0;

        writer.println("<div id='cart-container'>");
        writer.println("<h2>Your Items</h2>");
        // Acces database to get product information and print it out
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql:// localhost:3306/" + "products", "root",
                    "kingstoneGX911");
            Statement stmt = con.createStatement();

            for (String item : items.keySet()) {
                String sql = "SELECT * FROM products WHERE id=" + item;
                ResultSet rs = stmt.executeQuery(sql);
                while (rs.next()) {
                    // String id = rs.getString("id");
                    String title = rs.getString("title");
                    String image = rs.getString("image");
                    Double price = rs.getDouble("price");

                    Double quantityPrice = items.get(item) * price;
                    totalPrice += quantityPrice;

                    writer.println("<div class='cart-item'>");
                    writer.println("<div class='cart-item-img'>");
                    writer.println("<img src=" + image + ">");
                    writer.println("</div>");
                    writer.println("<div class='cart-item-details'>");
                    writer.println("<h3>" + title + "</h3>");
                    writer.println("<p>Quantity: " + items.get(item) + "</p>");
                    writer.println("</div>");
                    writer.println("<div class='cart-item-price'>");
                    writer.printf("<h3>Price: $%.2f</h3>", quantityPrice);

                    writer.println("</div>");
                    writer.println("</div>");
                }
            }
            double shippingCost = 0.0;
            if (shipping.equals("overnight")) {
                shippingCost = 10.0;
            } else if (shipping.equals("expedited")) {
                shippingCost = 7.0;
            }
            writer.printf("<h3 class='detailPrices'>Shipping: $%.2f</h3>", shippingCost);
            writer.printf("<h3 class='detailPrices'>Total: $%.2f</h3>", shippingCost + totalPrice);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {

            e.printStackTrace();
        }

        writer.println("</div></body></html>");

    }
}
