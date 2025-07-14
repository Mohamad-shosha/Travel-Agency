package com.travel.agency.services.impl;

import com.travel.agency.dto.UserDTO;
import com.travel.agency.entities.User;
import com.travel.agency.repositories.UserRepository;
import com.travel.agency.services.UserService;
import com.travel.agency.util.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return userMapper.toUserDTO(users);
    }

    public Optional<UserDTO> getUserByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        return optionalUser
                .map(userMapper::toUserDTO);
    }

    public UserDTO saveUser(UserDTO userDTO) {
        User user = userMapper.toUser(userDTO);
        userRepository.save(user);
        return userMapper.toUserDTO(user);
    }
}
