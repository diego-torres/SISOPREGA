package com.tramex.sisoprega.communication.ejb.reports.pdf;

import java.util.Map;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;

import com.tramex.sisoprega.communication.ejb.reports.BasePdfReport;
import com.tramex.sisoprega.reporting.Reporteable;

/**
 * Session Bean implementation class PdfGanadoRecibido
 */
@Stateless
@RolesAllowed({ "mx_usr", "us_usr" })
public class PdfGanadoInspeccionado extends BasePdfReport implements Reporteable {
  public void setParameters(Map<String, Object> parameters) throws Exception {
    super.setParameters(parameters);    

    long lRancherId = (Long) parameters.get("Id");
    if(lRancherId == -1)
      this.setReportName("TodaInspeccionGanado");
    
  }
}
