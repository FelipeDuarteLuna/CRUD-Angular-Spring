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

			for(int i=0; i<20; i++){
				Course c = new Course();
				c.setName("Angular com Spring " + i);
				c.setCategory(Category.FRONT_END);

				Lesson l = new Lesson();
				l.setName("Introdução");
				l.setYoutubeUrl("Nb4uxLxdvxo");
				l.setCourse( c );

				Lesson l2 = new Lesson();
				l2.setName("Angular v15");
				l2.setYoutubeUrl("hRgEjn2TGCQ");
				l2.setCourse( c );
				
				c.getLessons().add( l );
				c.getLessons().add( l2 );

				courseRepository.save(c);
			}

		};
	}
}

		
	
