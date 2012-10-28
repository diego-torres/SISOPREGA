package com.tramex.sisoprega.dto;

import java.util.Date;

public class Rancher {
	private long rancher_id;
	private String aka;
	private String first_name;
	private String last_name;
	private String mother_name;
	private Date birt_date;
	private String email_address;
	
	/**
	 * @return the rancher_id
	 */
	public long getRancher_id() {
		return rancher_id;
	}
	/**
	 * @param rancher_id the rancher_id to set
	 */
	public void setRancher_id(long rancher_id) {
		this.rancher_id = rancher_id;
	}
	/**
	 * @return the aka
	 */
	public String getAka() {
		return aka;
	}
	/**
	 * @param aka the aka to set
	 */
	public void setAka(String aka) {
		this.aka = aka;
	}
	/**
	 * @return the first_name
	 */
	public String getFirst_name() {
		return first_name;
	}
	/**
	 * @param first_name the first_name to set
	 */
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	/**
	 * @return the last_name
	 */
	public String getLast_name() {
		return last_name;
	}
	/**
	 * @param last_name the last_name to set
	 */
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	/**
	 * @return the mother_name
	 */
	public String getMother_name() {
		return mother_name;
	}
	/**
	 * @param mother_name the mother_name to set
	 */
	public void setMother_name(String mother_name) {
		this.mother_name = mother_name;
	}
	/**
	 * @return the birt_date
	 */
	public Date getBirt_date() {
		return birt_date;
	}
	/**
	 * @param birt_date the birt_date to set
	 */
	public void setBirt_date(Date birt_date) {
		this.birt_date = birt_date;
	}
	/**
	 * @return the email_address
	 */
	public String getEmail_address() {
		return email_address;
	}
	/**
	 * @param email_address the email_address to set
	 */
	public void setEmail_address(String email_address) {
		this.email_address = email_address;
	}
	
	
}
