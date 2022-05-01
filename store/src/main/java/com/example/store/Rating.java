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

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(name = "rating", value = "/rating")
public class Rating extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("RATINGS SERVLET");
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql:// localhost:3306/" + "products", "root", "kingstoneGX911");
            con.setAutoCommit(false);
            Statement stmt = con.createStatement();
            String rating = req.getParameter("range");
            String datetime = req.getParameter("datetime");
            System.out.println(datetime);
            String sql = "UPDATE orders SET rating='"+rating+"' WHERE datetime='"+datetime+"'";
            stmt.executeUpdate(sql);
            con.commit();
            con.close();

            PrintWriter writer = resp.getWriter();
            // writer.println("<html> <body>");
            
            writer.println("<h3>" + rating + "was submitted </h3>");
            // writer.println("</body> </html> ");
            resp.sendRedirect("/store");
        } catch(ClassNotFoundException e){
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        

    }
}
