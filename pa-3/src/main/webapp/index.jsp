<%@page import="java.com.example.store.*"%>
<%@page import="java.util.ArrayList"%>
<html>

<head>
    <link href="styles.css" rel="stylesheet" type="text/css">
    <link rel='stylesheet' href='//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css'>
    <script src='https://kit.fontawesome.com/a904bba290.js' crossorigin='anonymous'></script>
</head>

<body>
    <div class='navbar'>
        <a class='logo'>Fashend</a>
        <a href='checkout'>Checkout</a>
    </div>
    <%ArrayList<ProductInfo> productInfos = 
        (ArrayList<ProductInfo>)req.getAttribute("productInfos");
    for(ProductInfo p:productInfos){%>
        <tr>
            <td><%=p.getTitle()%></td>
        </tr>
    <%}%>

    <!-- Date <% out.print(new Date()); %>   -->

    <!-- <a href="test.html">wefwef</a>
    <h2>Hello World!</h2>
    <form action="./hello" method="get">
        <button type="submit">TEST</button>
    </form> -->
</body>

</html>