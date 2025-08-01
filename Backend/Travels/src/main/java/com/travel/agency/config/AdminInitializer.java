package com.travel.agency.config;

import com.travel.agency.entities.User;
import com.travel.agency.entities.enums.Role;
import com.travel.agency.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.findByEmail("admin@travel.com").isEmpty()) {
            User admin = User.builder()
                    .email("admin@travel.com")
                    .password(passwordEncoder.encode("admin123"))
                    .name("Admin User")
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            log.info(admin.toString());
        }
    }

}