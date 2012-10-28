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
package com.tramex.sisoprega.proxy.bean;

import javax.ejb.Stateless;

import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Exception;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.proxy.Cruddable;

/**
 * This proxy knows the logic to evaluate Ranchers and the way to the database
 * in order to save their data. Also, it is contained in EJB container, 
 * we can apply security and life cycle methods for resources.<BR/>
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

@Stateless
public class Rancher implements Cruddable {

	private String error_description;
	
	@Override
	public CreateGatewayResponse Create(GatewayRequest request) {
		CreateGatewayResponse response = new CreateGatewayResponse();
		com.tramex.sisoprega.dto.Rancher rancher = rancherFromRequest(request);
		if(validateRancher(rancher)){
			// TODO: Persist rancher object
		}else{
			response.setException(new Exception("R001", "Validation Exception:[" + error_description + "]", "proxy.Rancher.Create"));
		}
		return response;
	}

	@Override
	public ReadGatewayResponse Read(GatewayRequest request) {
		// TODO Query the persistence with the requested filter.
		ReadGatewayResponse response = new ReadGatewayResponse();
		response.setException(new Exception("R999", "Unimplemented functionality", "proxy.Rancher.Read"));
		return response;
	}

	@Override
	public UpdateGatewayResponse Update(GatewayRequest request) {
		UpdateGatewayResponse response = new UpdateGatewayResponse();
		com.tramex.sisoprega.dto.Rancher rancher = rancherFromRequest(request);
		if(validateRancher(rancher)){
			// TODO: Persist rancher object
		}else{
			response.setException(new Exception("R001", "Validation Exception:[" + error_description + "]", "proxy.Rancher.Create"));
		}
		return response;
	}

	@Override
	public Exception Delete(GatewayRequest request) {
		// TODO Auto-generated method stub
		return new Exception("R999", "Unimplemented functionality", "proxy.Rancher.Delete");
	}
	
	private boolean validateRancher(com.tramex.sisoprega.dto.Rancher rancher){
		// TODO: Provide validation method
		error_description="Unimplemented validation method";
		return false;
	}
	
	private com.tramex.sisoprega.dto.Rancher rancherFromRequest(GatewayRequest request){
		// TODO: Create rancher from request
		return new com.tramex.sisoprega.dto.Rancher();
	} 
	
}