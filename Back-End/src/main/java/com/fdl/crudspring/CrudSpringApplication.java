package com.fdl.crudspring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.fdl.crudspring.enums.Category;
import com.fdl.crudspring.model.Course;
import com.fdl.crudspring.model.Lesson;
import com.fdl.crudspring.repository.CourseRepository;


@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(CourseRepository courseRepository) {
		return args -> {
			courseRepository.deleteAll();

			Course c = new Course();
			c.setName("Angular com Spring");
			c.setCategory(Category.FRONT_END);

			Lesson l = new Lesson();
			l.setName("Introdução");
			l.setYoutubeUrl("Nb4uxLxdvxo");
			l.setCourse( c );
			
			c.getLessons().add( l );

			courseRepository.save(c);
		};
	}
}

		
	
