package com.example.tracker.controller;

import com.example.tracker.model.AppUser;
import com.example.tracker.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController 
{
    private final UserRepository userRepo;

    public AuthController(UserRepository userRepo) 
    {
        this.userRepo = userRepo;
    }

    // ================REGISTER=========================
    @PostMapping("/register")
    public AppUser register(@RequestBody AppUser user) 
    {

        //check if email already exists
        if (userRepo.findByEmail(user.getEmail()).isPresent()) 
        {
            throw new RuntimeException("Email already exists");
        }

        //save user in database
        return userRepo.save(user);
    }

    // ==========LOGIN=========================
    @PostMapping("/login")
    public AppUser login(@RequestBody AppUser user) 
    {

        //find user by email
        AppUser existing = userRepo.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        //password check
        if (!existing.getPassword().equals(user.getPassword())) 
        {
            throw new RuntimeException("Wrong password");
        }

        return existing;
    }
}