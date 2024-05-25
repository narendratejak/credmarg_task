package com.credmarg.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.credmarg.dto.VendorDto;


@Service
public class EmailService {
	
	public void sendEmailToVendors(List<VendorDto> vendors) {
        for (VendorDto vendor : vendors) {
            String emailContent = createEmailContent(vendor);
            // Mock sending email by printing to console
            System.out.println("Sending email:");
            System.out.println(emailContent);
            System.out.println("-----------------------");
        }
    }

    private String createEmailContent(VendorDto vendor) {
        return String.format("Sending payments to vendor %s at upi %s", vendor.getName(), vendor.getUpi());
    }

}
