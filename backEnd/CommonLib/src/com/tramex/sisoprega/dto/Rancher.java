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

import java.util.Date;

/**
 * Defines the model for the Rancher entity.<BR/>
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
public class Rancher {
	private long rancherId;
	private String aka;
	private String firstName;
	private String lastName;
	private String motherName;
	private Date birthDate;
	private String emailAddress;

	/**
	 * @return the rancher_id
	 */
	public long getRancherId() {
		return rancherId;
	}

	/**
	 * @param rancherId
	 *            the rancher_id to set
	 */
	public void setRancherId(long rancherId) {
		this.rancherId = rancherId;
	}

	/**
	 * @return the aka
	 */
	public String getAka() {
		return aka;
	}

	/**
	 * @param aka
	 *            the aka to set
	 */
	public void setAka(String aka) {
		this.aka = aka;
	}

	/**
	 * @return the first_name
	 */
	public String getFirstName() {
		return firstName;
	}

	/**
	 * @param firstName
	 *            the first_name to set
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	/**
	 * @return the last_name
	 */
	public String getLastName() {
		return lastName;
	}

	/**
	 * @param lastName
	 *            the last_name to set
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	/**
	 * @return the mother_name
	 */
	public String getMotherName() {
		return motherName;
	}

	/**
	 * @param motherName
	 *            the mother_name to set
	 */
	public void setMotherName(String motherName) {
		this.motherName = motherName;
	}

	/**
	 * @return the birt_date
	 */
	public Date getBirthDate() {
		return birthDate;
	}

	/**
	 * @param birthDate
	 *            the birt_date to set
	 */
	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	/**
	 * @return the email_address
	 */
	public String getEmailAddress() {
		return emailAddress;
	}

	/**
	 * @param emailAddress
	 *            the email_address to set
	 */
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	@Override
	public String toString() {
		return "rancherId:" + rancherId + "; name:" + lastName + " "
				+ motherName + ", " + firstName + ";alias:" + aka + ";email:"
				+ emailAddress + ";birthDate:" + birthDate + ";";
	}

}
