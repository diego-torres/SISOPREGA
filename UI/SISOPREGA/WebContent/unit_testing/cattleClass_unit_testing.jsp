<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    	               "http://www.w3.org/TR/html4/loose.dtd">

<html>
  <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    	<title>GlassFish JSP Page</title>
    	<script src="../scripts/jquery-1.8.2/jquery.js"></script>
    	<script src="../scripts/webServicesConsuming/config.js"></script>
    	<script src="../scripts/webServicesConsuming/consumingGateway.js"></script>
  </head>
  <body>    
    <div id = "seccion"></div>
    <script>
            $(document).ready(function() {
            	
				//########################################################################################
            	
            	$("#seccion").append("<h1>Consumir Login</h1>");
            	
            	consumirLogin = consumingGateway.Login("mex_user", "mex_user");
            	
            	$("#seccion").append("<b>exceptionID: </b>" + consumirLogin.exceptionId + "<br />");
            	$("#seccion").append("<b>exceptionDescription: </b>" + consumirLogin.exceptionDescription + "<br />");
            	
            	//########################################################################################
            	
            	$("#seccion").append("<h1>Consumir Create</h1>");
            	
            	entity = {catclassName: "test"};
            	
            	consumirCreate = consumingGateway.Create("CattleClass", entity);
            	
            	$("#seccion").append("<b>origin: </b>" + consumirCreate.origin + "<br />");
            	$("#seccion").append("<b>exceptionID: </b>" + consumirCreate.exceptionId + "<br />");
            	$("#seccion").append("<b>exceptionDescription: </b>" + consumirCreate.exceptionDescription + "<br />");
            	$("#seccion").append("<b>generatedID: </b>" + consumirCreate.generatedId + "<br />");
            	//########################################################################################
            	
            	$("#seccion").append("<h1>Consumir Read</h1>");
            	miEntidad = {catclassId:consumirCreate.generatedId};
            	
            	consumirRead = consumingGateway.Read("CattleClass", miEntidad);
            	
                $("#seccion").append("<b>Entity Name: </b>" + consumirRead.entityName + "<br />");
            	$("#seccion").append("<b>Exception ID: </b>" + consumirRead.exceptionId + "<br />");
            	$("#seccion").append("<b>Exception Description: </b>" + consumirRead.exceptionDescription + "<br />");
            	$("#seccion").append("<b>Origin: </b>" + consumirRead.origin + "<br /><br />");
            	$.each(consumirRead.records, function() {            		
    	    		$.each(this, function(key, value){
    	    			$("#seccion").append("<b>" + key + "</b> " + value + "<br />");
    	    		});
    	    		$("#seccion").append("<br />");
    	    	});            	
            	//########################################################################################
            	
				$("#seccion").append("<h1>Consumir Update</h1>");
            	
            	entity2 = {catclassId: consumirCreate.generatedId,
            				catclassName:'test2'};
            	
            	consumirUpdate = consumingGateway.Update("CattleClass", entity2);            	
            	
            	$("#seccion").append("<b>origin: </b>" + consumirUpdate.origin + "<br />");
            	$("#seccion").append("<b>exceptionID: </b>" + consumirUpdate.exceptionId + "<br />");
            	$("#seccion").append("<b>exceptionDescription: </b>" + consumirUpdate.exceptionDescription + "<br />");
            	$("#seccion").append("<b>entityName: </b>" + consumirUpdate.entityName + "<br />");
            	//########################################################################################
            	$("#seccion").append("<h1>Consumir Read All</h1>");
            	
            	consumirRead = consumingGateway.Read("CattleClass", {});
            	
            	$("#seccion").append("<b>Entity Name: </b>" + consumirRead.entityName + "<br />");
            	$("#seccion").append("<b>Exception ID: </b>" + consumirRead.exceptionId + "<br />");
            	$("#seccion").append("<b>Exception Description: </b>" + consumirRead.exceptionDescription + "<br />");
            	$("#seccion").append("<b>Origin: </b>" + consumirRead.origin + "<br /><br />");
            	
            	$.each(consumirRead.records, function() {            		
    	    		$.each(this, function(key, value){
    	    			$("#seccion").append(key + " " + value + "<br />");
    	    		});
    	    		$("#seccion").append("<br />");
    	    	});
            	//########################################################################################
            	$("#seccion").append("<h1>Consumir Delete</h1>");
            	
            	entity2.catclassId = consumirCreate.generatedId;
            	
            	
            	$("#seccion").append("cattleClassId a eliminar: " + entity2.catclassId + "<br />");
            	consumirDelete = consumingGateway.Delete("CattleClass", entity2);
            	
                $("#seccion").append("<b>origin: </b>" + consumirDelete.origin + "<br />");
            	$("#seccion").append("<b>exceptionID: </b>" + consumirDelete.exceptionId + "<br />");
            	$("#seccion").append("<b>exceptionDescription: </b>" + consumirDelete.exceptionDescription + "<br />");
            	//########################################################################################
            	$("#seccion").append("<h1>Consumir LogOut</h1>");
            	
            	consumirLogOut = consumingGateway.LogOut();
            	
            	$("#seccion").append("<b>result: </b>" + consumirLogOut.result + "<br />");
            	$("#seccion").append("<b>exceptionID: </b>" + consumirLogOut.exceptionId + "<br />");
            	$("#seccion").append("<b>exceptionDescription: </b>" + consumirLogOut.exceptionDescription + "<br />");
				//########################################################################################
            }); //$(document).ready(function()
        </script>
  </body>
</html>