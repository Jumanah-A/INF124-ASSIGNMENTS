package com.project.store;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(urlPatterns = {"/getTax"})
public class getTax extends HttpServlet
{
  String[] taxRates = new String[] {};

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
    {
      String input = request.getParameter("input");
      String taxRate ="0";
      try {
        Class.forName("com.mysql.jdbc.Driver");
        Connection con = DriverManager.getConnection("jdbc:mysql:// localhost:3306/" + "taxes", "root",
            "database101");
        Statement stmt = con.createStatement();
        String sql = "SELECT * FROM `taxRate` WHERE ZipCode="+input+" LIMIT 1;";

        ResultSet rs = stmt.executeQuery(sql);
        while (rs.next()) {
          taxRate = rs.getString("CombinedRate");
        }
        System.out.println(input);
        response.setContentType("text/html;charset=UTF-8");

        try(PrintWriter out = response.getWriter()) {
              out.println(taxRate);
              out.close();
            }

      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (SQLException e) {

        e.printStackTrace();
      }
    }
}
