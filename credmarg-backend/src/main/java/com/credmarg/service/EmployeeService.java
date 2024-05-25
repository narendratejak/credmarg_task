package com.credmarg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.credmarg.dto.EmployeeDto;

import com.credmarg.entity.Employee;

import com.credmarg.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository repository;
	
	public EmployeeDto addEmployee(EmployeeDto empDtoReq) {
	    EmployeeDto resp = new EmployeeDto();

	    try {
	        // Check if email already exists
	    	Optional<Employee> existingEmployee = repository.findByEmail(empDtoReq.getEmail());
	        if (existingEmployee.isPresent()) {
	            resp.setMessage("Email already exists");
	            resp.setStatusCode(409);  // 409 Conflict
	            return resp;
	        }

	        // Create new employee
	        Employee employee = new Employee();
	        employee.setEmail(empDtoReq.getEmail());
	        employee.setName(empDtoReq.getName());
	        employee.setDesignation(empDtoReq.getDesignation());
	        employee.setCtc(empDtoReq.getCtc());

	        Employee addResult = repository.save(employee);
	        System.out.println(addResult);

	        if (addResult.getId() > 0) {
	            resp.setEmployee(addResult);
	            resp.setMessage("Employee Added Successfully");
	            resp.setStatusCode(200);
	        }
	    } catch (Exception e) {
	        resp.setStatusCode(500);
	        resp.setError(e.getMessage());
	    }

	    return resp;
	}

	
	 public EmployeeDto getAllEmployees() {
		 EmployeeDto reqRes = new EmployeeDto();

	        try {
	           List<Employee> result = repository.findAll();
	            if (!result.isEmpty()) {
	                reqRes.setEmployees(result);
	                reqRes.setStatusCode(200);
	                reqRes.setMessage("Successful");
	            } else {
	                reqRes.setStatusCode(404);
	                reqRes.setMessage("No users found");
	            }
	            return reqRes;
	        } catch (Exception e) {
	            reqRes.setStatusCode(500);
	            reqRes.setMessage("Error occurred: " + e.getMessage());
	            return reqRes;
	        }
	    }
	

}
