package com.credmarg.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.credmarg.entity.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, Integer> {

}
