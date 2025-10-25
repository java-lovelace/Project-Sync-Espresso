package com.espresso.projectsync;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ProjectsyncApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectsyncApplication.class, args);
	}

}
