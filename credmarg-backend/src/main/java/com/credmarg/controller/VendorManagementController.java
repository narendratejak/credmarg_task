package com.credmarg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.credmarg.dto.VendorDto;

import com.credmarg.service.EmailService;

import com.credmarg.service.VendorService;

@RestController
public class VendorManagementController {
	
	@Autowired
    private VendorService vendorService;
	
	@Autowired
	 private EmailService emailService;

 
 @PostMapping("/admin/addVendor")
    public ResponseEntity<VendorDto> regeister(@RequestBody VendorDto reg){
	 System.out.println(reg);
        return ResponseEntity.ok(vendorService.addVendor(reg));
    }
 
 @GetMapping("/admin/getAllVendors")
    public ResponseEntity<VendorDto> getEmployees(){
        return ResponseEntity.ok(vendorService.getAllVendors());

    }
 
 
 @PostMapping("/admin/sendMails")
 public void sendEmails(@RequestBody List<VendorDto> vendors) {
     emailService.sendEmailToVendors(vendors);
 }


}
