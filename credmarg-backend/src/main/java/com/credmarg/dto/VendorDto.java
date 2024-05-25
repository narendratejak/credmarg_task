package com.credmarg.dto;

import java.util.List;


import com.credmarg.entity.Vendor;

import lombok.Data;

@Data
public class VendorDto {
	
	private String name;
	private String email;
	private String upi;
	private Vendor vendor;
	private int statusCode;
    private String error;
    private String message;
    private List<Vendor> vendorList;


}
