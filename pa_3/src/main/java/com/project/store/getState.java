package com.project.store;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletConfig;


@WebServlet(urlPatterns = { "/getState" })
public class getState extends HttpServlet {
    String[] states = new String[] { "Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California",
            "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii",
            "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland",
            "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota",
            "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon",
            "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
            "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming" };

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("GET STATE SERVLET");
        String input = request.getParameter("input");
        response.setContentType("text/html;charset=UTF-8");
        String possibleStates = "";
            for (String state : this.states) {
                if (state.toLowerCase().startsWith(input.toLowerCase())) {
                    possibleStates += state + ",";
                }
            }
        try (PrintWriter out = response.getWriter()) {
            out.println(possibleStates);
            out.close();
        }
    }
}
