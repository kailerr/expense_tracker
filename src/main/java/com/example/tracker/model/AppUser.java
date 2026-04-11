package com.example.tracker.model;

import jakarta.persistence.*;

@Entity
@Table(name = "app_user")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;

    public AppUser() {}


    //geter and seter
    public Long getId() 
    { 
        return id; 
    }

    public String getEmail() 
    { 
        return email; 
    }
    
    public void setEmail(String email) 
    { 
        this.email = email; 

    }

    public String getPassword() 
    { return password; 

    }

    public void setPassword(String password)
    { 
        this.password = password; 
    }
}