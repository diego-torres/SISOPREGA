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
 *  Defines the model for the Barnyard entity.<BR/>
 * 
 * <B>Revision History:</B>
 * 
 * <PRE>
 * ====================================================================================
 * Date        By                           Description
 * MM/DD/YYYY
 * ----------  ---------------------------  -------------------------------------------
 * 11/25/2012  Jaime Figueroa                 Initial Version.
 * ====================================================================================
 * </PRE>
 * @author Jaime Figueroa
 *
 */
public class BarnyardCapacity {
    private long capacityId;
    private long barnyardId;
    private long catclassId;
    private long headCount;
    /**
     * @return the capacityId
     */
    public long getCapacityId() {
        return capacityId;
    }
    /**
     * @param capacityId the capacityId to set
     */
    public void setCapacityId(long capacityId) {
        this.capacityId = capacityId;
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
     * @return the catclassId
     */
    public long getCatclassId() {
        return catclassId;
    }
    /**
     * @param catclassId the catclassId to set
     */
    public void setCatclassId(long catclassId) {
        this.catclassId = catclassId;
    }
    /**
     * @return the headCount
     */
    public long getHeadCount() {
        return headCount;
    }
    /**
     * @param headCount the headCount to set
     */
    public void setHeadCount(long headCount) {
        this.headCount = headCount;
    }
    
}