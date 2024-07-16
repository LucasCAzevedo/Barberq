package com.br.barberq.barberq;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
@SpringBootApplication( exclude = { SecurityAutoConfiguration.class } )

public class BarberqApplication {

	public static void main(String[] args) {
		SpringApplication.run(BarberqApplication.class, args);
	}

}
