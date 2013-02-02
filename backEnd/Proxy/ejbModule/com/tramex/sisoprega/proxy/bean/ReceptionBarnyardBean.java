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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.Error;
import com.tramex.sisoprega.common.GatewayContent;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;
import com.tramex.sisoprega.common.crud.Cruddable;
import com.tramex.sisoprega.dto.RancherInvoice;
import com.tramex.sisoprega.dto.ReceptionBarnyard;

/**
 * This proxy knows the logic to evaluate Reception Barnyards' information and
 * the way to the database in order to save their data. Also, it is contained in
 * EJB container, we can apply security and life cycle methods for resources.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 *  ====================================================================================
 *  Date        By                           Description
 *  MM/DD/YYYY
 *  ----------  ---------------------------  -------------------------------------------
 *  12/04/2012  Jaime Figueroa                Initial Version.
 *  12/13/2012  Diego Torres                  Enable Read Operation. 
 *  12/16/2012  Diego Torres                  Adding log activity
 *  01/03/2013  Diego Torres                  Adding delete request using receptionId & 
 *                                            barnyardId
 * 01/22/2013  Diego Torres                  Implementing DataModel.
 *  ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 * 
 */
@Stateless
public class ReceptionBarnyardBean extends BaseBean implements Cruddable {

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.common.crud.Cruddable#Create(com.tramex.sisoprega.
   * common.GatewayRequest)
   */
  @Override
  public CreateGatewayResponse Create(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Create");

    CreateGatewayResponse response = new CreateGatewayResponse();
    ReceptionBarnyard recepBarnyard = null;
    try {
      recepBarnyard = entityFromRequest(request, ReceptionBarnyard.class);

      this.log.fine("Received ReceptionBarnyard in request: " + recepBarnyard);

      if (validateEntity(recepBarnyard)) {
        this.log.finer("ReceptionBarnyard succesfully validated");
        dataModel.createDataModel(recepBarnyard);

        String sId = String.valueOf(recepBarnyard.getRecBarnyardId());
        this.log.finer("Setting ReceptionBarnyard id in response: " + sId);
        response.setGeneratedId(sId);
        response.setError(new Error("0", "SUCCESS", "proxy.ReceptionBarnyardBean.Create"));
        this.log.info("Reception Barnyard [" + recepBarnyard.toString() + "] created by principal[" + getLoggedUser() + "]");
      } else {
        this.log.warning("Error de validación: " + error_description);
        response.setError(new Error("VAL01", "Error de validación: " + error_description, "proxy.ReceptionBarnyardBean.Create"));
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating ReceptionBarnyardBean");
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.ReceptionBarnyardBean.Create"));
      else {
        response.setError(new Error("DB02", "Create exception: " + e.getMessage(), "proxy.ReceptionBarnyardBean.Create"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Create");
    return response;
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.common.crud.Cruddable#Read(com.tramex.sisoprega.common
   * .GatewayRequest)
   */
  @Override
  public ReadGatewayResponse Read(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Read");

    ReadGatewayResponse response = new ReadGatewayResponse();
    response.setEntityName(request.getEntityName());

    ReceptionBarnyard rBarnyard = null;
    try {
      rBarnyard = entityFromRequest(request, ReceptionBarnyard.class);

      this.log.fine("Got reception barnyard from request: " + rBarnyard);

      String qryLogger = "";
      String queryName = "";
      Map<String, Object> parameters = new HashMap<String, Object>();
      if (rBarnyard.getRecBarnyardId() != 0) {
        queryName = "CRT_RECEPTIONBARNYARD_BY_ID";
        parameters.put("recBarnyardId", rBarnyard.getRecBarnyardId());
        qryLogger = "By recBarnyardId [" + rBarnyard.getRecBarnyardId() + "]";
      } else if (rBarnyard.getReceptionId() != 0) {
        queryName = "RECEPTION_BARNYARD_BY_RECEPTION_ID";
        parameters.put("receptionId", rBarnyard.getReceptionId());
        qryLogger = "By receptionId [" + rBarnyard.getReceptionId() + "]";
      } else if(rBarnyard.getBarnyardId() != 0){
        queryName = "RECEPTION_BARNYARD_BY_BARNYARD_ID";
        parameters.put("barnyardId", rBarnyard.getBarnyardId());
        qryLogger = "By barnyardId [" + rBarnyard.getBarnyardId() + "]";
      } else {
        response.setError(new Error("VAL03", "El filtro especificado no es válido para las recepciones de ganado.",
            "proxy.ReceptionBarnyard.Read"));
        return response;
      }

      List<ReceptionBarnyard> queryResults = dataModel.readDataModelList(queryName, parameters, ReceptionBarnyard.class);

      if (queryResults.isEmpty()) {
        response.setError(new Error("VAL02", "No se encontraron datos para el filtro seleccionado", "proxy.ReceptionBarnyard.Read"));
      } else {
        response.getRecord().addAll(contentFromList(queryResults, ReceptionBarnyard.class));

        response.setError(new Error("0", "SUCCESS", "proxy.ReceptionBarnyard.Read"));
        this.log.info("Read operation " + qryLogger + " executed by principal[" + getLoggedUser() + "] on ReceptionBarnyardBean");
      }
    } catch (Exception e) {
      this.log.severe("Exception found while reading rancher invoice filter");
      this.log.throwing(this.getClass().getCanonicalName(), "Read", e);

      response.setError(new Error("DB02", "Error en la base de datos: " + e.getMessage(), "proxy.ReceptionBarnyard.Read"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Read");
    return response;
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.common.crud.Cruddable#Update(com.tramex.sisoprega.
   * common.GatewayRequest)
   */
  @Override
  public UpdateGatewayResponse Update(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Update");
    UpdateGatewayResponse response = new UpdateGatewayResponse();
    ReceptionBarnyard recepBarnyard = null;
    try {
      recepBarnyard = entityFromRequest(request, ReceptionBarnyard.class);

      if (recepBarnyard.getRecBarnyardId() == 0) {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar actualizar sus datos.",
            "proxy.ReceptionBarnyard.Update"));
      } else {
        if (validateEntity(recepBarnyard)) {
          dataModel.updateDataModel(recepBarnyard);

          GatewayContent content = getContentFromEntity(recepBarnyard, ReceptionBarnyard.class);
          response.setUpdatedRecord(content);

          response.setError(new Error("0", "SUCCESS", "proxy.ReceptionBarnyard.Update"));
          this.log.info("Reception Barnyard [" + recepBarnyard.toString() + "] updated by principal[" + getLoggedUser() + "]");
        } else {
          this.log.warning("Validation error:" + error_description);
          response.setError(new Error("VAL01", "Error de validación de datos:" + error_description,
              "proxy.ReceptionBarnyardBean.Update"));
        }
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating ReceptionBarnyard");
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new Error("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, ",
            "proxy.ReceptionBarnyardBean.Update"));
      else {
        response.setError(new Error("DB02", "Error en la base de datos:[" + e.getMessage() + "]",
            "proxy.ReceptionBarnyardBean.Update"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Update");
    return response;
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * com.tramex.sisoprega.common.crud.Cruddable#Delete(com.tramex.sisoprega.
   * common.GatewayRequest)
   */
  @Override
  public BaseResponse Delete(GatewayRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "Delete");
    BaseResponse response = new BaseResponse();

    try {
      ReceptionBarnyard recepBarnyard = entityFromRequest(request, ReceptionBarnyard.class);
      if(recepBarnyard.getRecBarnyardId()!=0){
        recepBarnyard = dataModel.readSingleDataModel("CRT_RECEPTIONBARNYARD_BY_ID", "recBarnyardId", recepBarnyard.getRecBarnyardId(), ReceptionBarnyard.class);
        this.log.info("Deleting Reception Barnyard [" + recepBarnyard.toString() + "] by principal[" + getLoggedUser() + "]");
        dataModel.deleteDataModel(recepBarnyard, getLoggedUser());
        response.setError(new Error("0", "SUCCESS", "proxy.ReceptionBarnyard.Delete"));
      }else if(recepBarnyard.getBarnyardId()!=0 && recepBarnyard.getReceptionId()!=0){
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("barnyard_id", recepBarnyard.getBarnyardId());
        parameters.put("reception_id", recepBarnyard.getReceptionId());
        List<ReceptionBarnyard> barnyards = dataModel.readDataModelList("RECEPTION_BARNYARD_BY_BARNYARD_ID_AND_RECEPTION_ID", parameters, ReceptionBarnyard.class);
        
        if(!barnyards.isEmpty()){
          recepBarnyard = barnyards.get(0);
          this.log.info("Deleting Reception Barnyard [" + recepBarnyard.toString() + "] by barnyardId and receptionId[" + getLoggedUser() + "]");
          dataModel.deleteDataModel(recepBarnyard, getLoggedUser());
        }

        response.setError(new Error("0", "SUCCESS", "proxy.ReceptionBarnyard.Delete"));
      } else {
        this.log.warning("VAL04 - Entity ID Omission.");
        response.setError(new Error("VAL04", "Se ha omitido el id del corral al intentar eliminar el registro.",
            "proxy.ReceptionBarnyard.Delete"));
      }
      
    } catch (Exception e) {
      this.log.severe("Exception found while deleting ReceptionBarnyard");
      this.log.throwing(this.getClass().getName(), "Delete", e);

      response.setError(new Error("DEL01",
          "Error al intentar borrar datos, es probable que esta entidad tenga otras entidades relacionadas, ",
          "proxy.ReceptionBarnyard.Delete"));
    }

    this.log.exiting(this.getClass().getCanonicalName(), "Delete");
    return response;
  }

  /**
  * Override functionality, evaluating over ReceptionBarnyardBean for
  * duplicates.
  */
 
}
