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
            writer.println("<div class='navbar'><a class='logo'>Fashend</a></div>");
            writer.println("<div id='products-section'>");
            System.out.println("PRODUCTS SERVLET");
            while(rs.next()){                  
                
                String id = rs.getString("id");
                String title = rs.getString("title");
                String price =rs.getString("price");
                String description = rs.getString("description");
                String category = rs.getString("category");
                String image = rs.getString("image");
                int rate = rs.getInt("rate");
                String count = rs.getString("count");

                writer.println("<div class='product' id='" + id + "'>");
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

                writer.println("</div>");
                
            }
            writer.println("</div>");
            writer.println("</body> </html> ");
            con.close();

            RequestDispatcher rd=req.getRequestDispatcher("./lastfive");  
            rd.include(req, resp);  
        }
        catch(ClassNotFoundException e){
            e.printStackTrace();
        } catch (SQLException e) {
           
            e.printStackTrace();
        }
    }
}


