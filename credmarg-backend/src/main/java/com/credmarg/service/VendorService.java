package com.credmarg.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.credmarg.dto.VendorDto;

import com.credmarg.entity.Vendor;

import com.credmarg.repository.VendorRepository;

@Service
public class VendorService {
	
	@Autowired
	private VendorRepository repository;
	
	public VendorDto addVendor(VendorDto vendorDtoReq){
		VendorDto resp = new VendorDto();

        try {
            Vendor vendor = new Vendor();
            vendor.setEmail(vendorDtoReq.getEmail());
            vendor.setName(vendorDtoReq.getName());
            vendor.setUpi(vendorDtoReq.getUpi());
            
            
            
            Vendor addResult = repository.save(vendor);
            System.out.println(addResult);
            if (addResult.getId()>0) {
                resp.setVendor(vendor);
                resp.setMessage("Vendor Saved Successfully");
                resp.setStatusCode(200);
            }

        }catch (Exception e){
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }
	
	
	 public VendorDto getAllVendors() {
		 VendorDto reqRes = new VendorDto();

	        try {
	         List<Vendor> result = repository.findAll();
	            if (!result.isEmpty()) {
	                reqRes.setVendorList(result);
	                reqRes.setStatusCode(200);
	                reqRes.setMessage("Successful");
	            } else {
	                reqRes.setStatusCode(404);
	                reqRes.setMessage("No Vendors found");
	            }
	            return reqRes;
	        } catch (Exception e) {
	            reqRes.setStatusCode(500);
	            reqRes.setMessage("Error occurred: " + e.getMessage());
	            return reqRes;
	        }
	    }
	

}
