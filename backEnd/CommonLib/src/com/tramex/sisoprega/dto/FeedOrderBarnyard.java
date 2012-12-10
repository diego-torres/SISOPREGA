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
package com.tramex.sisoprega.dto;

/**
 * Defines the model for the Feed Order Barnyard Type entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 12/09/2012  Jaime Figueroa                 Initial Version.
 * ====================================================================================
 * </PRE>
 * 
 * @author Jaime Figueroa
 *
 */
public class FeedOrderBarnyard {
  private long feedOrdBarnId;
  private long barnyardId;
  private long orderId;
  /**
   * @return the feedOrdBarnId
   */
  public long getFeedOrdBarnId() {
    return feedOrdBarnId;
  }
  /**
   * @param feedOrdBarnId the feedOrdBarnId to set
   */
  public void setFeedOrdBarnId(long feedOrdBarnId) {
    this.feedOrdBarnId = feedOrdBarnId;
  }
  /**
   * @return the barnyardId
   */
  public long getBarnyardId() {
    return barnyardId;
  }
  /**
   * @param barnyardId the barnyardId to set
   */
  public void setBarnyardId(long barnyardId) {
    this.barnyardId = barnyardId;
  }
  /**
   * @return the orderId
   */
  public long getOrderId() {
    return orderId;
  }
  /**
   * @param orderId the orderId to set
   */
  public void setOrderId(long orderId) {
    this.orderId = orderId;
  }
}