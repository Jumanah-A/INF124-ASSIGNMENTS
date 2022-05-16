<%@ page import="javax.xml.crypto.Data" %>
<%@ page import="com.project.store.DatabaseHelper" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>

<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<h2>Last 5 Orders</h1>
<div id="last-orders">
        <%
            DatabaseHelper databaseHelper = new DatabaseHelper();
            Connection connection = databaseHelper.getConnection();
            Statement statement = connection.createStatement();
            Statement product_stmt = connection.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * FROM orders ORDER by datetime asc LIMIT 5");
            while(rs.next()) {
                String pid = rs.getString("productID");
                String datetime = rs.getString("datetime");
                int rating = rs.getInt("rating");
                

                String productSQL = "SELECT * FROM products WHERE id='" + pid + "'";
                ResultSet product_rs = product_stmt.executeQuery(productSQL);
                while (product_rs.next()) {
                    String image = product_rs.getString("image");
                    String title = product_rs.getString("title");
                    String price = product_rs.getString("price");
                    
                
        %>
            <div class="past-order">
                <div>
                    <img class="review-img" src="<%=image%>">
                </div>
                <div class="past-order-details">
                    <h3>Order placed on <%=datetime.split(" ")[0]%></h3>
                    <h4><%=title%></h4>
                    <p>Total: <%=price%></p>
                    <p>
                        Your Rating:
                        <%for (int i=0; i<rating; i++) { %>
                            <i class='fa-solid fa-star'></i>
                        <% } %>
                        <% for (int i=0; i<5-rating; i++) { %>
                            <i class='fa-regular fa-star'></i>
                        <% } %>
                    </p>
                    </br>Submit new rating:
                    <form class='rating'  action='./rating' method='post' oninput='rangevalue.value = range.valueAsNumber'>
                        <input class='rate' type='range' min='1' max='5' name='range' value='1'>
                        <output name='rangevalue' for='range'>1</output>
                        <input type='hidden' name='datetime' value='<%=datetime%>'>
                        <button id='rating-button' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
            
        <% }} %>
    </div>
</div>