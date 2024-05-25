package com.credmarg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.credmarg.repository.UserRepository;

@Component
public class MyUserDetailService implements UserDetailsService {
	
	@Autowired
    private UserRepository usersRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return usersRepo.findByEmail(username).orElseThrow();
	}

}
