package com.example.store;

import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(name = "details", urlPatterns = { "/details" })
public class detailedProduct extends HttpServlet {
  @Override
  public void init() throws ServletException {
    super.init();
  }

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    try {
      PrintWriter writer = resp.getWriter();
      writer.println(
          "<html><head><link rel='stylesheet' href='styles.css'><link rel='stylesheet' href='//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css'><script src='https://kit.fontawesome.com/a904bba290.js' crossorigin='anonymous'></script></head><body>");
      String productId = req.getQueryString().split("=")[1];
      Class.forName("com.mysql.jdbc.Driver");
      Connection con = DriverManager.getConnection("jdbc:mysql:// localhost:3306/" + "products", "root",
          "database101");
      Statement stmt = con.createStatement();
      String sql = "SELECT * FROM products WHERE id=" + productId + ";";

      ResultSet rs = stmt.executeQuery(sql);
      while (rs.next()) {
        String id = rs.getString("id");
        String title = rs.getString("title");
        String price = rs.getString("price");
        String description = rs.getString("description");
        String image = rs.getString("image");
        int rate = rs.getInt("rate");

        writer.println(
            "<div class='navbar'><a href='products' class='logo'>Fashend</a><a href='checkout'>Checkout</a></div>");
        writer.println(
            "<div name='current-product-structure' id='current-product-container'><div id='current-product'><div class='flex-half'>");
        writer.println("<img class='product-image' name='product-image' src=" + image
            + "></div><div class='flex-half' id='product-info'>");
        writer.println("<h1 class='product-name'>" + title + "</h1><h2 class='product-price'>Price: " + price
            + "</h2>");
        writer.println("Rating: ");
        for (int i = 0; i < rate; i++) {
          writer.println("<i class='fa-solid fa-star'></i>");
        }

        for (int i = 0; i < 5 - rate; i++) {
          writer.println("<i class='fa-regular fa-star'></i>");
        }
        writer.println("</br>");
        writer.println("</br>");
        writer.println("<p>"+description+"</p>");
        writer.println("<a href='./add-cart?name=" + id
            + "'><button id='order' class='orderButton'>Add to Cart</button></a></div></div></div>");

      }
      writer.println("</body></html>");

    } catch (ClassNotFoundException e) {
      e.printStackTrace();
    } catch (SQLException e) {

      e.printStackTrace();
    }
  }

}
