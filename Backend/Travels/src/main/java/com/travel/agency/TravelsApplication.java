package com.travel.agency;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TravelsApplication {

    public static void main(String[] args) {
        SpringApplication.run(TravelsApplication.class, args);
    }

}
