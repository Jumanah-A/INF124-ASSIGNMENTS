package com.example.store;

import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;

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

@WebServlet( name = "details", urlPatterns = { "/details" })
public class detailedProduct extends HttpServlet{
  @Override
    public void init() throws ServletException {
        super.init();
    }

  @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
      try {
        PrintWriter writer = resp.getWriter();
        writer.println("<html><head><link rel='stylesheet' href='styles.css'><link rel='stylesheet' href='//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css'><script src='https://kit.fontawesome.com/a904bba290.js' crossorigin='anonymous'></script></head><body>");
        String productId = req.getQueryString().split("=")[1];
        Class.forName("com.mysql.jdbc.Driver");
        Connection con = DriverManager.getConnection("jdbc:mysql:// localhost:3306/" + "products", "root","database101");
        Statement stmt = con.createStatement();
        String sql = "SELECT * FROM products WHERE id="+productId+";";

        ResultSet rs = stmt.executeQuery(sql);
        while (rs.next()) {
          // String id = rs.getString("id");
          String title = rs.getString("title");
          String price = rs.getString("price");
          String description = rs.getString("description");
          String image = rs.getString("image");
          int rate = rs.getInt("rate");

          writer.println("<div class='navbar'><a class='logo'>Fashend</a></div>");
          writer.println(
              "<div name='current-product-structure' id='current-product-container'><div id='current-product'><div class='flex-half'>");
          writer.println("<img class='product-image' name='product-image' src=" + image
              + "></div><div class='flex-half' id='product-info'>");
          writer.println("<h1 class='product-name'>" + title + "</h1><h2 class='product-price'>Price: " + price
              + "</h2><p class='product-rating'>Rating: " + rate + "</p><p class='product-description'>" + description
              + "</p></div></div></div>");

        }

      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (SQLException e) {

        e.printStackTrace();
      }
      }

}
