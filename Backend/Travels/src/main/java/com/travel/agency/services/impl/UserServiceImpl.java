package com.travel.agency.services.impl;

import com.travel.agency.dto.UserDTO;
import com.travel.agency.entities.User;
import com.travel.agency.entities.enums.Role;
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

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return userMapper.toUserDTO(users);
    }

    @Override
    public Optional<UserDTO> getUserByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        return optionalUser
                .map(userMapper::toUserDTO);
    }

    @Override
    public UserDTO saveUser(UserDTO userDTO) {
        User user = userMapper.toUser(userDTO);
        userRepository.save(user);
        return userMapper.toUserDTO(user);
    }

    @Override
    public UserDTO findUserByName(String name) {
        User user = userRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + name));
        return userMapper.toUserDTO(user);
    }

    @Override
    public UserDTO promoteUserToAdmin(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        user.setRole(Role.ADMIN);
        userRepository.save(user);
        return userMapper.toUserDTO(user);
    }

}
