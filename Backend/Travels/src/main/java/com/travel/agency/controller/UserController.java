package com.travel.agency.controller;

import com.travel.agency.dto.UserDTO;
import com.travel.agency.entities.User;
import com.travel.agency.services.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserServiceImpl userServiceImpl;

    @Autowired
    public UserController (UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @GetMapping
    public List<UserDTO> getAllUsers(){
        return userServiceImpl.getAllUsers();
    }

    @PostMapping
    public UserDTO createUser(@RequestBody UserDTO userDTO){
        return userServiceImpl.saveUser(userDTO);
    }
}
