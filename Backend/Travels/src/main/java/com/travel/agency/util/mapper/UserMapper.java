package com.travel.agency.util.mapper;

import com.travel.agency.dto.UserDTO;
import com.travel.agency.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toUserDTO(User user);

    List<UserDTO> toUserDTO(List<User> users);

    User toUser(UserDTO userDTO);
}