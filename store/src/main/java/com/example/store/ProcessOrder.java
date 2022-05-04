package com.example.store;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.*;

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

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "processOrder", value = "/processOrder")
public class ProcessOrder extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("ORDER SERVLET");
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql:// localhost:3306/" + "products", "root",
                    "kingstoneGX911");
            con.setAutoCommit(false);
            Statement stmt = con.createStatement();

            HttpSession session = req.getSession();
            if (session.getAttribute("cart") == null) {
                System.out.println("NOTHING IN CART");
                resp.sendRedirect("checkout");

            } else {
                @SuppressWarnings("unchecked")
                List<String> cartlist = (ArrayList<String>) session.getAttribute("cart");
                for (String item : cartlist) {
                    Date date = new Date();
                    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
                    String datetime = format.format(date);
                    String id = item;
                    System.out.println(datetime);

                    String sql = "insert into orders(datetime,`productID`) values('" + datetime + "','" + id + "');";
                    stmt.executeUpdate(sql);
                    con.commit();
                    // con.close();
                }
            }

            RequestDispatcher rd=req.getRequestDispatcher("./orderDetails");
            rd.include(req, resp);
            

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
}
