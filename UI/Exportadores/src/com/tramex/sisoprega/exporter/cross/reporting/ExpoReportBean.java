/**
 * 
 */
package com.tramex.sisoprega.exporter.cross.reporting;

import javax.ejb.EJB;

import com.tramex.sisoprega.exporter.cross.reporting.common.BaseReport;
import com.tramex.sisoprega.reporting.Reporteable;

/**
 * USAGE COMMENT HERE
 *  
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * Jul 21, 2013     Diego Torres                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Diego Torres
 *
 * 
 */
public class ExpoReportBean extends BaseReport {
  
  @EJB(lookup = "java:global/ComProxy/PdfExportado")
  private Reporteable reporteExpo;

  @Override
  protected void setReporteable() {
    this.reporteable = reporteExpo;
    this.getFilterBean().setReportName("Exportacion");
  }

}
