/**
 * THIS IS A COMMERCIAL PROGRAM PROVIDED FOR TRAMEX AND IT'S ASSOCIATES
 * BUILT BY EXTERNAL SOFTWARE PROVIDERS.
 * THE SOFTWARE COMPRISING THIS SYSTEM IS THE PROPERTY OF TRAMEX OR ITS
 * LICENSORS.
 * 
 * ALL COPYRIGHT, PATENT, TRADE SECRET, AND OTHER INTELLECTUAL PROPERTY RIGHTS
 * IN THE SOFTWARE COMPRISING THIS SYSTEM ARE, AND SHALL REMAIN, THE VALUABLE
 * PROPERTY OF TRAMEX OR ITS LICENSORS.
 * 
 * USE, DISCLOSURE, OR REPRODUCTION OF THIS SOFTWARE IS STRICTLY PROHIBITED,
 * EXCEPT UNDER WRITTEN LICENSE FROM TRAMEX OR ITS LICENSORS.
 * 
 * &copy; COPYRIGHT 2012 TRAMEX. ALL RIGHTS RESERVED.
 */
package com.tramex.sisoprega.gateway.ws;

import java.util.Properties;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.naming.Context;
import javax.naming.InitialContext;

import org.apache.log4j.Logger;

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.Field;
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;

/**
 * OperationsGateway provides the web service and the web methods
 * that will be consumed by the UI applications.<BR/>
 * The OperationsGateway must decide which proxy will attend the request.
 * 
 * <B>Revision History:</B> 
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 10/27/2012  Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 */
@WebService(serviceName="GatewayService")
public class OperationsGateway {
	
	private Logger log = Logger.getLogger(OperationsGateway.class);
	
	/**
	 * 
	 * Provides an interface to create entities.
	 * 
	 * @param request
	 * @return
	 */
	@WebMethod(operationName="Create")
	public CreateGatewayResponse CreateGateway(@WebParam(name="request") final GatewayRequest request){
		log.info("BEGIN|CreateGateway|Entity:[" + request.getEntityName()+"]|RequestId:["+request.getRequestId()+"]");
		CreateGatewayResponse result = null;
		Error cgrEx = null;
		try{
			Cruddable crud = getCruddable(request.getEntityName());
			result = crud.Create(request);
		}catch(java.lang.Exception e){
			log.error("Error while creating entity [" + request.getEntityName() + "]", e);
			result = new CreateGatewayResponse();
			cgrEx = new Error("CG001", "Error on Creation", "CreateGateway");
			result.setError(cgrEx);
		}
		
		log.info("END|CreateGateway|Entity:[" + request.getEntityName()+"]|RequestId:["+request.getRequestId()+"]");
		return result;
	}
	
	/**
	 * 
	 * Provides an interface to read entities.
	 * Use id in parameters to get only one record representing the requested
	 * entity by id.
	 * 
	 * @param request
	 * @return
	 */
	@WebMethod(operationName="Read")
	public ReadGatewayResponse ReadGateway(@WebParam(name="request")GatewayRequest request){
		log.info("BEGIN|ReadGateway|Entity:[" + request.getEntityName()+"]|RequestId:["+request.getRequestId()+"]");
		// TODO: Define a proxy that returns a ReadGatewayResponse
		ReadGatewayResponse rgr = new ReadGatewayResponse();
		rgr.setEntityName(request.getEntityName());
		
		GatewayContent gc = new GatewayContent();
		gc.getFields().add(new Field("nombre", "valor"));
		
		rgr.getRecord().add(gc);
		log.info("END|ReadGateway|Entity:[" + request.getEntityName()+"]|RequestId:["+request.getRequestId()+"]");
		return rgr;
	}
	
	/**
	 * Provides an interface to update entities.
	 * will return the updated entity.
	 * @param request
	 * @return
	 */
	@WebMethod(operationName="Update")
	public UpdateGatewayResponse UpdateGateway(@WebParam(name="request") GatewayRequest request){
		log.info("BEGIN|UpdateGateway|Entity:[" + request.getEntityName()+"]|RequestId:["+request.getRequestId()+"]");
		// TODO: Define a proxy that returns a UpdateGatewayResponse
		UpdateGatewayResponse ugr = new UpdateGatewayResponse();
		ugr.setEntityName(request.getEntityName());
		ugr.getUpdatedRecord().getFields().add(new Field("nombre", "valor"));
		log.info("END|UpdateGateway|Entity:[" + request.getEntityName()+"]|RequestId:["+request.getRequestId()+"]");
		return ugr;
	}
	
	@WebMethod(operationName="Delete")
	public BaseResponse DeleteGateway(@WebParam(name="request") GatewayRequest request){
		log.info("BEGIN|DeleteGateway|Entity:[" + request.getEntityName()+"]|RequestId:["+request.getRequestId()+"]");
		// TODO: Define a proxy that returns a BaseResponse (from delete action).
		BaseResponse br = new BaseResponse();
		Error e = new Error("0", "Success", "DeleteGateway");
		br.setError(e);
		log.info("END|DeleteGateway|Entity:[" + request.getEntityName()+"]|RequestId:["+request.getRequestId()+"]");
		return br;
	}
	
	private Cruddable getCruddable(String cruddableName){
		Context jndiContext = null;
		Cruddable crud = null;
		String commonPrefix = "java:global/Proxy/";
		String commonSuffix = "Proxy";
		try{
			jndiContext = new InitialContext();
			crud = (Cruddable)jndiContext.lookup(commonPrefix + cruddableName + commonSuffix);
			log.debug("Cruddable instance created for entity [" + cruddableName + "]");
		} catch(java.lang.Exception e){
			log.error("Unable to load jndi context component", e);
		}
		return crud;
	}
	
}
