package com.foodrescue.dto;

public class AdminRegisterDTO {

    private String adminName;

    private String email;

    private String password;

    private String role;

    private String status;

	public AdminRegisterDTO(String adminName, String email, String password, String role, String status) {
		super();
		this.adminName = adminName;
		this.email = email;
		this.password = password;
		this.role = role;
		this.status = status;
	}

	public AdminRegisterDTO() {

	}

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
}