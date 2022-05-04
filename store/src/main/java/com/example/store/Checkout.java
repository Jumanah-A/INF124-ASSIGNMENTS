package com.example.store;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.http.HttpSession;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;

@WebServlet(name = "checkout", value = "/checkout")
public class Checkout extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("name", "value");
        System.out.println(req.getAttribute("name"));
        PrintWriter writer = resp.getWriter();
        // writer.println("<h1>TEST</h1>");

        writer.println(
                "<div class='navbar'><a href='products' class='logo'>Fashend</a><a href='checkout'>Checkout</a></div>");

        HttpSession session = req.getSession();

        //Place items into dictionary so we can find the quantity of each item in cart
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

        System.out.println(items);
        
        writer.println("<div id='cart-container'>");
        writer.println("<h2>Shopping Cart</h2>");
        //Acces database to get product information and print it out
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
                    writer.printf("<h3>$%.2f</h3>", quantityPrice);
                    writer.println("</div>");
                    writer.println("</div>");
                    // writer.println("<h4 class='product-price'>" + price + "</h4>");
                }
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {

            e.printStackTrace();
        }
        writer.printf("<h3 id='total-price'>Total Price: $%.2f</h3>", totalPrice);
        writer.println("</div>");
        RequestDispatcher rd = req.getRequestDispatcher("/WEB-INF/checkout.html");
        rd.include(req, resp);
    }
}
