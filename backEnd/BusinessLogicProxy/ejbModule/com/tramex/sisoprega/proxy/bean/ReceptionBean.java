package com.tramex.sisoprega.proxy.bean;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Asynchronous;
import javax.ejb.EJB;
import javax.ejb.Stateless;

import com.tramex.sisoprega.dto.Inspection;
import com.tramex.sisoprega.dto.InspectionForecast;
import com.tramex.sisoprega.dto.InspectionForecastDetail;
import com.tramex.sisoprega.dto.Pen;
import com.tramex.sisoprega.dto.Reception;
import com.tramex.sisoprega.dto.ReceptionHeadcount;
import com.tramex.sisoprega.gateway.GatewayError;
import com.tramex.sisoprega.gateway.GatewayRecord;
import com.tramex.sisoprega.gateway.request.CreateRequest;
import com.tramex.sisoprega.gateway.response.ReadResponse;
import com.tramex.sisoprega.proxy.Cruddable;
import com.tramex.sisoprega.proxy.common.BaseBean;
import com.tramex.sisoprega.reporting.Messageable;

/**
 * Session Bean implementation class ReceptionBean
 */
@Stateless
@RolesAllowed({ "sisoprega_admin", "mx_usr", "us_usr", "rancher", "agency" })
public class ReceptionBean extends BaseBean implements Cruddable {

  @EJB(lookup = "java:global/ComProxy/Messenger")
  private Messageable msgBean;

  @Override
  public ReadResponse Create(CreateRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "CreateResponse Create(CreateRequest)");

    ReadResponse response = new ReadResponse();
    try {

      GatewayRecord record = request.getParentRecord();
      Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
      Reception entity = (Reception) getEntityFromRecord(record, type);
      this.log.fine("Found reception from Record [" + entity + "]");

      if (!hasPen(entity)) {
        error_description = "El registro de recepcion que esta intentando agregar no ha requerido el uso de ning�n corral. "
            + "Toda recepci�n debe estar relacionada a por lo menos un corral del mapa de operaciones.";

        this.log.warning("Error de validaci�n: " + error_description);
        response.setError(new GatewayError("VAL01", "Error de validaci�n: " + error_description, "Create"));
        return response;
      }

      if (this.validateEntity(entity)) {
        this.log.fine("Valid entity found");

        dataModel.createDataModel(entity);

        log.fine("Reception record created, setting InspectionForecast");
        setInspectionForecast(entity);

        List<Object> updatedRecordList = new ArrayList<Object>();
        log.fine("Setting as response object: {" + entity + "}");
        updatedRecordList.add(entity);

        if (getWeight(entity) > 0.0d && getHeadCount(entity) > 0) {
          // Send reception message
          log.info("Sending receive confirmation to exporter [" + entity.getRancherId() + "]");
          // TODO: Send record Id to be used in text message
          String reportName = "GanadoRecibido?Id=" + entity.getRancherId() + formatReportDateRange();
          sendReport(entity.getRancherId(), reportName);
        }

        response.setParentRecord(getRecordsFromList(updatedRecordList, type));
        response.setError(new GatewayError("0", "SUCCESS", "Update"));

      } else {
        this.log.warning("Error de validaci�n: " + error_description);
        response.setError(new GatewayError("VAL01", "Error de validaci�n: " + error_description, "Create"));
        return response;
      }

    } catch (Exception e) {
      this.log.severe("Exception found while creating entity: " + e.getMessage());
      this.log.throwing(this.getClass().getName(), "Create", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new GatewayError("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
                + "muy probablemente el registro que usted quiere agregar ya existe en la base de datos.", "Create"));
      else {
        response.setError(new GatewayError("DB02", "Create exception: " + e.getMessage(), "Create"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "CreateResponse Create(CreateRequest)");
    return response;
  }

  @Override
  public ReadResponse Update(CreateRequest request) {
    this.log.entering(this.getClass().getCanonicalName(), "ReadResponse Create(CreateRequest)");

    ReadResponse response = new ReadResponse();
    try {
      GatewayRecord record = request.getParentRecord();
      Class<?> type = Class.forName(DTO_PACKAGE + record.getEntity());
      Reception entity = (Reception) getEntityFromRecord(record, type);
      this.log.fine("Found entity from Record [" + entity + "]");

      if (this.validateEntity(entity)) {
        this.log.fine("Valid entity found");

        Class<?>[] params = null;
        Object[] invokeParams = null;
        String entityCamelCaseName = "get" + record.getEntity() + "Id";

        log.fine("Executing method [" + entityCamelCaseName + "]");

        long idToUpdate = (Long) type.getMethod(entityCamelCaseName, params).invoke(entity, invokeParams);

        if (idToUpdate == 0) {
          this.log.warning("VAL04 - Entity ID Omission.");
          response.setError(new GatewayError("VAL04", "Se ha omitido el id en la entidad [" + record.getEntity()
              + "] al intentar actualizar sus datos.", "Update"));
        } else {

          if (!hasPen(entity)) {
            // Create inspection record if it does not exists
            if (entity.getInspection() == null || entity.getInspection().size() == 0) {
              log.info("Adding inspection to released reception");
              Inspection inspection = new Inspection();
              inspection.setInspectionDate(new Date());
              inspection.setComments("Ganado liberado sin defectos");
              inspection.setWeight(getWeight(entity));
              entity.addInspection(inspection);
            }
          }

          dataModel.updateDataModel(entity);

          String queryName = record.getEntity().toUpperCase() + "_BY_ID";
          log.fine("Retrieving updated object with Query: " + queryName);

          entity = (Reception) dataModel.readSingleDataModel(queryName, "Id", idToUpdate, type);
          log.fine("got updated record: [" + entity + "], setting inspection forecast");

          if (getTomorrow(entity.getDateAllotted()).compareTo(getTomorrow(new Date())) >= 0)
            setInspectionForecast(entity);

          List<Object> updatedRecordList = new ArrayList<Object>();
          updatedRecordList.add(entity);

          if (!hasPen(entity)) {
            // Send inspection confirmation
            log.info("Sending inspection confirmation to exporter [" + entity.getRancherId() + "]");
            String reportName = "GanadoInspeccionado?Id=" + entity.getRancherId() + formatReportDateRange();
            sendReport(entity.getRancherId(), reportName);
          } else {
            // Send modification confirmation
            log.info("Sending reception change confirmation to exporter [" + entity.getRancherId() + "]");
            String reportName = "RegistroModificadoEnGanadoRecibido?Id=" + entity.getRancherId() + formatReportDateRange() + "&recordId=" + entity.getReceptionId();
            sendReport(entity.getRancherId(), reportName);
          }

          response.setParentRecord(getRecordsFromList(updatedRecordList, type));
          response.setError(new GatewayError("0", "SUCCESS", "Update"));
        }
      } else {
        this.log.warning("Error de validaci�n: " + error_description);
        response.setError(new GatewayError("VAL01", "Error de validaci�n: " + error_description, "Update"));
        return response;
      }

    } catch (Exception e) {
      this.log.severe("Exception found while updating entity: " + e.getMessage());
      this.log.throwing(this.getClass().getName(), "Update", e);

      if (e instanceof javax.persistence.PersistenceException)
        response.setError(new GatewayError("DB01",
            "Los datos que usted ha intentado ingresar, no son permitidos por la base de datos, "
                + "muy probablemente el registro que usted quiere agregar ya existe en la base de datos.", "Update"));
      else {
        response.setError(new GatewayError("DB02", "Update exception: " + e.getMessage(), "Update"));
      }
    }

    this.log.exiting(this.getClass().getCanonicalName(), "ReadResponse Update(CreateRequest)");
    return response;
  }
  
  @Asynchronous
  private void sendReport(long rancherId, String reportName){
    log.info("Sending inspection confirmation to exporter [" + rancherId + "]");
    msgBean.sendReport(rancherId, reportName);
  }

  private void setInspectionForecast(Reception reception) {
    this.log.entering(this.getClass().getCanonicalName(), "void setInspectionForecast(Reception)");
    InspectionForecast ifc = getInspectionForecast(reception.getDateAllotted());
    log.fine("got InspectionForecast:[" + ifc + "]");

    if (!ifc.isLocked()) {
      InspectionForecastDetail ifd = getInspectionForecastDetail(ifc, reception);
      log.fine("got InspectionForecastDetail:[" + ifd + "]");

      if (ifd.getInspectionForecastDetailId() == 0)
        ifc.addInspectionForecastDetail(ifd);

      if (ifc.getInspectionForecastId() == 0) {
        log.fine("inspection forecast not found in database, creating one: " + ifc);
        dataModel.createDataModel(ifc);
      }

    } else {
      log.fine("Inspection forecast is already locked");
    }

    this.log.exiting(this.getClass().getCanonicalName(), "void setInspectionForecast(Reception)");
  }

  private boolean hasPen(Reception reception) {
    return !(reception.getPen() == null || reception.getPen().size() == 0);
  }

  private InspectionForecastDetail getInspectionForecastDetail(InspectionForecast forecast, Reception reception) {
    // calculate headcount
    long headCount = getHeadCount(reception);

    if (headCount > 0) {
      InspectionForecastDetail ifd = getInspectionForecastDetail(forecast, reception.getPen());
      ifd.setCattleType(reception.getCattleType());
      ifd.setOrigin(reception.getLocationId());
      ifd.setPen(reception.getPen());
      ifd.setRancherId(reception.getRancherId());
      ifd.setZoneId(reception.getZoneId());

      ifd.setQuantity(headCount);
      return ifd;
    } else
      return null;
  }

  private InspectionForecastDetail getInspectionForecastDetail(InspectionForecast forecast, Set<Pen> pen) {
    InspectionForecastDetail ifd = new InspectionForecastDetail();

    if (forecast.getInspectionForecastDetail() != null && forecast.getInspectionForecastDetail().size() > 0) {
      for (InspectionForecastDetail detail : forecast.getInspectionForecastDetail()) {
        for (Pen detailPen : detail.getPen()) {
          if (pen.contains(detailPen))
            return detail;
        }
      }
    }

    return ifd;
  }

  private InspectionForecast getInspectionForecast(Date inspectionDate) {

    InspectionForecast ifc = null;
    Date forecastDate = getTomorrow(inspectionDate);

    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("forecastDate", forecastDate);

    List<InspectionForecast> ifcList = dataModel.readDataModelList("INSPECTIONFORECAST_BY_DATE", parameters,
        InspectionForecast.class);

    if (ifcList == null || ifcList.isEmpty()) {
      ifc = new InspectionForecast();
      ifc.setForecastDate(forecastDate);
    } else {
      ifc = ifcList.get(0);
    }

    return ifc;
  }

  private Date getTomorrow(Date date) {
    // calculate tomorrow of given date.
    Calendar cal = Calendar.getInstance();
    cal.setTime(date);
    cal.add(Calendar.DATE, 1); // For tomorrow

    return cal.getTime();

  }

  private long getHeadCount(Reception reception) {
    // calculate headcount
    long headCount = 0;
    for (ReceptionHeadcount rh : reception.getReceptionHeadcount()) {
      headCount += rh.getHc();
    }
    return headCount;
  }

  private double getWeight(Reception reception) {
    double weight = 0.0d;
    for (ReceptionHeadcount rh : reception.getReceptionHeadcount()) {
      weight += rh.getWeight();
    }
    return weight;
  }

  private String formatReportDateRange() {
    String result = "";
    String sToday = new SimpleDateFormat("MM/dd/yyyy").format(new Date());

    result = "&fromDate=" + sToday + "&toDate=" + sToday;

    return result;
  }
}
