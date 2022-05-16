<%@ page import="javax.xml.crypto.Data" %>
<%@ page import="com.project.store.DatabaseHelper" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
    <head>
        <link rel='stylesheet' href='styles.css'><link rel='stylesheet' href='//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css'>
        <script src='https://kit.fontawesome.com/a904bba290.js' crossorigin='anonymous'></script>
    </head>
<body>
    <div class='navbar'>
        <a class='logo'>Fashend</a>
        <a href='checkout.jsp'>Checkout</a>
    </div>
    <div id='products-section'>
        <%
            DatabaseHelper databaseHelper = new DatabaseHelper();
            Connection connection = databaseHelper.getConnection();
            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * FROM products");
            while(rs.next()) {
                String id = rs.getString("id");
                String title = rs.getString("title");
                
                
                String image = rs.getString("image");
                int rate = rs.getInt("rate");
                String count = rs.getString("count");
                String details = "./details?name="+id;

        %>
        <a class="product" id="<%=id%>" href="<%=details%>">
            
            <img src="<%=image%>" id="<%=id%>">
            <h3 class="product-title" id="<%=id%>"><%=title%></h3>
            <%
                for (int i=0; i<rate; i++) {
            %>
                <i class='fa-solid fa-star'></i>
            <%
                }
            %>
            <%
                for (int i=0; i<5-rate; i++) {
            %>
                <i class='fa-regular fa-star'></i>
            <%
                }
            %>
            <span class="review-count"><%=count%>&nbsp;&nbsp;reviews</span>
                
        </a>

        <% } connection.close();%>  
    </div>
    <jsp:include page="/latestProducts.jsp"/>
</body>
</html>
