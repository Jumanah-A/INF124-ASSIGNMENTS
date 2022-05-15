package com.example.store;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
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

@WebServlet(name = "lastfive", value = "/lastfive")
public class LatestOrders extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql:// localhost:3306/" + "products", "root",
                    "database101");
            Statement stmt = con.createStatement();
            Statement product_stmt = con.createStatement();
            String sql = "SELECT * FROM orders ORDER by datetime asc LIMIT 5";
            ResultSet rs = stmt.executeQuery(sql);
            System.out.println(rs);

            PrintWriter writer = resp.getWriter();

            writer.println("<h2>Last 5 Orders</h1>");
            writer.println("<div id='last-orders'>");
            System.out.println("LATEST ORDERS SERVLET");
            // int orderCount = 1;
            // int orderCount = 1;
            while (rs.next()) {
                writer.println("<div class='past-order'>");
                String id = rs.getString("productID");
                String datetime = rs.getString("datetime");


                String productSQL = "SELECT * FROM products WHERE id='" + id + "'";
                ResultSet product_rs = product_stmt.executeQuery(productSQL);
                while (product_rs.next()) {
                    String image = product_rs.getString("image");
                    String title = product_rs.getString("title");
                    String price = product_rs.getString("price");
                    int rating = rs.getInt("rating");
                    writer.println("<div>");
                    writer.println("<img class='review-img' src='"+image+"'>");
                    writer.println("</div>");

                    writer.println("<div class='past-order-details'>");
                    writer.println("<h3>Order placed on " + datetime.split(" ")[0] + "</h3>");
                    writer.println("<h4>" + title + "</h4>");
                    writer.println("<p>Total: " + price + "</p>");

                    writer.println("<p>Your Rating:");
                    for (int i=0; i<rating; i++) {
                        writer.println("<i class='fa-solid fa-star'></i>");
                    }

                    for (int i=0; i<5-rating; i++) {
                        writer.println("<i class='fa-regular fa-star'></i>");
                    }
                    writer.println("</p>");
                }
                product_rs.close();

                writer.println("</br>Submit new rating:");
                writer.println("<form class='rating'  action='./rating' method='post' oninput='rangevalue"+".value = range"+".valueAsNumber'>");
                writer.println("<input class='rate' type='range' min='1' max='5' name='range"+"' value='1'>");
                writer.println("<output name='rangevalue"+"' for='range"+"'>1</output>");
                writer.println("<input type='hidden' name='datetime' value='"+datetime+"'>");
                // writer.println(
                //         "<input class='star_input' type='radio' name='rating' class='star' value='5' id='5'><label for='5'>&star;</label>");
                // writer.println(
                //         "<input class='star_input' type='radio' name='rating' class='star' value='4' id='4'><label for='4'>&star;</label>");
                // writer.println(
                //         "<input class='star_input' type='radio' name='rating' class='star' value='3' id='3'><label for='3'>&star;</label>");
                // writer.println(
                //         "<input class='star_input' type='radio' name='rating' class='star' value='2' id='2'><label for='2'>&star;</label>");
                // writer.println(
                //         "<input class='star_input' type='radio' name='rating' class='star' value='1' id='1'><label for='1'>&star;</label>");
                writer.println("<button id='rating-button' type='submit'>Submit</button>");
                writer.println("</form>");
                writer.println("</div>");
                writer.println("</div>");
                // orderCount++;
            }
            writer.println("</div>");
            con.close();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {

            e.printStackTrace();
        }

    }
}
