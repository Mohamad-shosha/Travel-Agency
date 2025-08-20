package com.travel.agency.services;

import com.travel.agency.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {
    List<UserDTO> getAllUsers();

    Optional<UserDTO> getUserByEmail(String email);

    UserDTO saveUser(UserDTO userDTO);

    public UserDTO findUserByName(String Name);

    public UserDTO promoteUserToAdmin(Long id);

    public UserDTO demoteAdminToUser(Long id);

    public String deleteUserByEmail(String email);
}
