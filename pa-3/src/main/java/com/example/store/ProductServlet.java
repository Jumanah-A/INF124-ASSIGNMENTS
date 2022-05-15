package com.example.store;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.omg.CORBA.Request;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.*;
import java.util.ArrayList;
import java.util.List;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(name = "products", value = "/products")
public class ProductServlet extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try{
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql:// localhost:3306/" + "products", "root", "kingstoneGX911");
            Statement stmt = con.createStatement();
            String sql = "SELECT * FROM products";
            ResultSet rs = stmt.executeQuery(sql);

            PrintWriter writer = resp.getWriter();

            writer.println("<html><head><link rel='stylesheet' href='styles.css'><link rel='stylesheet' href='//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css'><script src='https://kit.fontawesome.com/a904bba290.js' crossorigin='anonymous'></script></head><body>");
            writer.println("<div class='navbar'><a class='logo'>Fashend</a><a href='checkout'>Checkout</a></div>");
            writer.println("<div id='products-section'>");

            List<ProductInfo> productInfos = new ArrayList<ProductInfo>();

            System.out.println("PRODUCTS SERVLET");
            while(rs.next()){

                String id = rs.getString("id");
                String title = rs.getString("title");
                // String price =rs.getString("price");
                // String description = rs.getString("description");
                // String category = rs.getString("category");
                String image = rs.getString("image");
                int rate = rs.getInt("rate");
                String count = rs.getString("count");
                String details = "./details?name="+id;

                writer.println("<a class='product' id='" + id + "'href='" + details +"'>");
                // writer.println("<img src='" + image + "' id='" + id + "'>");
                writer.println("<img src='" + image + "' id='" + id + "'>");
                writer.println("<h3 class='product-title' id='" + id + "'>" + title + "</h3>");
                // writer.println("<h4 class='product-price'>" + price + "</h4>");

                for (int i=0; i<rate; i++) {
                    writer.println("<i class='fa-solid fa-star'></i>");
                }

                for (int i=0; i<5-rate; i++) {
                    writer.println("<i class='fa-regular fa-star'></i>");
                }

                writer.println("<span class='review-count'>  " + count + " reviews</span>");

                writer.println("</a>");

                ProductInfo productInfo = new ProductInfo(id, title, image, rate, count, details);
                // System.out.println(productInfo);
                productInfos.add(productInfo);
            }
            writer.println("</div></body> </html> ");
            con.close();

            RequestDispatcher rd=req.getRequestDispatcher("./index.jsp");
            req.setAttribute("productInfos", productInfos);
            rd.forward(req, resp);

            rd=req.getRequestDispatcher("./lastfive");
            rd.include(req, resp);
        }
        catch(ClassNotFoundException e){
            e.printStackTrace();
        } catch (SQLException e) {

            e.printStackTrace();
        }
    }
}
