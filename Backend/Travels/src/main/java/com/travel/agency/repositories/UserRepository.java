package com.travel.agency.repositories;

import com.travel.agency.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    List<User> findAll();

    Optional<User> findByName(String Name);

    User getById(Long id);

}