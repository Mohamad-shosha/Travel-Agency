package com.travel.agency.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200", "https://travel-agency-production.vercel.app",
                        "https://travel-agency-cnfak7g2w-mohamed-shoshas-projects.vercel.app")
                .allowedMethods("*");
    }
}
