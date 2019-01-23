<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/webpage/include/taglib.jsp"%>
<%@page import="com.jeeplus.core.web.Servlets"%>
<%
response.setStatus(404);

// 如果是异步请求或是手机端，则直接返回信息
if (Servlets.isAjaxRequest(request)) {
	out.print("页面不存在.");
}

//输出异常信息页面
else {
%>
<!DOCTYPE html>
<html>

<head>
  <title>404 页面</title>
  <style>
  body {
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", sans-serif;
    font-size: 13px;
    color: #676a6c;
}
	.middle-box h1 {
    font-size: 170px;
}
	  .middle-box {
	    max-width: 400px;
	    z-index: 100;
	    margin: 0 auto;
	    padding-top: 40px;
	}
	
	.font-bold {
    font-weight: 600;
}
  
  
  </style>
</head>

<body>


    <div class="middle-box text-center animated fadeInDown">
        <h1>404</h1>
        <h3 class="font-bold">页面未找到！</h3>

        <div class="error-desc">
            抱歉，页面好像去火星了~
        </div>
    </div>

</body>

</html>

<%}%>