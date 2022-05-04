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
        PrintWriter writer =resp.getWriter();
        // writer.println("<h1>TEST</h1>");
        writer.println("<div class='navbar'><a href='products' class='logo'>Fashend</a><a href='checkout'>Checkout</a></div>");

        RequestDispatcher rd = req.getRequestDispatcher("/WEB-INF/checkout.html");
        rd.include(req, resp);
    }
}
