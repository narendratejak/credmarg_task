package com.credmarg.dto;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.credmarg.entity.Employee;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EmployeeDto {
	
	@NotNull(message = "username shouldn't be null")
	@Length(min = 4, message = "name length shoud be 4")
	private String name;
	private String designation;
	
	@Min(500)
	@Max(100000)
	private double ctc;
	
	@Email(message = "invalid email address")
	private String email;
	private Employee employee;
	private int statusCode;
    private String error;
    private String message;
    private List<Employee> employees;

}
