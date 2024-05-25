package com.credmarg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.credmarg.entity.Users;

public interface UserRepository extends JpaRepository<Users, Integer> {
	
	Optional<Users> findByEmail(String email);

}
