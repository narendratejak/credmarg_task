package com.credmarg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.credmarg.dto.EmployeeDto;

import com.credmarg.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
public class EmployeeManagementController {
	
	 @Autowired
	    private EmployeeService empService;
	 
	 @PostMapping("/admin/addEmployee")
	    public ResponseEntity<EmployeeDto> regeister(@RequestBody @Valid EmployeeDto reg){
		 System.out.println(reg);
	        return ResponseEntity.ok(empService.addEmployee(reg));
	    }
	 
	 @GetMapping("/admin/getAllEmployees")
	    public ResponseEntity<EmployeeDto> getEmployees(){
	        return ResponseEntity.ok(empService.getAllEmployees());

	    }

}
