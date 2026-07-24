package com.foodrescue;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class FoodRescuePlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(FoodRescuePlatformApplication.class, args);
    }
}
