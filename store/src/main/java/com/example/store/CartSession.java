package com.example.store;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


@WebServlet(name="add-cart", value="/add-cart")
public class CartSession extends HttpServlet{

  // @Override
  // public void init() throws ServletException {
  //   super.init();
  // }

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    System.out.println("HI IN CART SESSION");
    String itemId = req.getQueryString().split("=")[1];
    PrintWriter writer = resp.getWriter();

    writer.println(
        "<html><head><link rel='stylesheet' href='styles.css'><link rel='stylesheet' href='//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css'><script src='https://kit.fontawesome.com/a904bba290.js' crossorigin='anonymous'></script></head><body>");
    writer.println("<div class='navbar'><a class='logo'>Fashend</a></div>");
    writer.println("<h1>HELLO CART SESSION"+itemId+"</h1></body></html>");
    HttpSession session = req.getSession();
    if(session.getAttribute("cart") == null)
    {
      ArrayList<String> cart = new ArrayList<String>();
      cart.add(itemId);
      session.setAttribute("cart", cart);
      System.out.println("Elements of ArrayList are:");
      for (int i = 0; i < cart.size(); i++) {
        System.out.println(cart.get(i) + " ");
      }

    }else{
      @SuppressWarnings("unchecked")
      List<String> cartlist = (ArrayList<String>) session.getAttribute("cart");
      cartlist.add(itemId);
      System.out.println("Elements of cart are:");
      for (int i = 0; i < cartlist.size(); i++) {
        System.out.println(cartlist.get(i) + " ");
      }
    }





  }
}
