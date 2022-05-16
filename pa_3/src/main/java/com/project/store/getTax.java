package com.project.store;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = {"/getTax"})
public class getTax extends HttpServlet
{
  String[] taxRates = new String[] {};

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
    {
      System.out.println("hellloooo");
      System.out.println("GET TAX SERVLET");
      double zipcodeTax = 0.08;
      // Scanner sc = new Scanner(new File(".....data/tax_rates2.csv"));
      // // parsing a CSV file into the constructor of Scanner class
      // sc.useDelimiter(",");
      // // setting comma as delimiter pattern
      // while (sc.hasNext()) {
      //   System.out.print(sc.next());
      // }
      // sc.close();
      // closes the scanner
      String input = request.getParameter("input");
      System.out.println(input);
      response.setContentType("text/html;charset=UTF-8");
      // String possibleTaxes = "";
      // for(String tax :this.taxRates)

      try(PrintWriter out = response.getWriter()) {
            out.println(zipcodeTax);
            out.close();

      }

    }

}
