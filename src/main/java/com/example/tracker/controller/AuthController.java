package com.example.tracker.controller;

import com.example.tracker.model.User;
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
    public User register(@RequestBody User user) 
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
    //find user bu email
    public User login(@RequestBody User user) 
    {
        User existing = userRepo.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        //password check
        if (!existing.getPassword().equals(user.getPassword())) 
        {
            throw new RuntimeException("Wrong password");
        }
        return existing;
    }
}//testchange