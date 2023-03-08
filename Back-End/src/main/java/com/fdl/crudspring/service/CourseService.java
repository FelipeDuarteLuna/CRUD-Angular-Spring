package com.fdl.crudspring.service;

import java.util.List;

import com.fdl.crudspring.exception.RecordNotFoundException;
import com.fdl.crudspring.model.Course;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;

import com.fdl.crudspring.repository.CourseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CourseService {
    
    private final CourseRepository courseRepository;

    //Constructors
    public CourseService ( CourseRepository courseRepository ){
        
        this.courseRepository = courseRepository;
    }

    //Method's
    public List<Course> list() {

        return courseRepository.findAll();
    }

    
    public Course findById(@PathVariable @NotNull @Positive Long idCOurse){

        return courseRepository.findById(idCOurse).orElseThrow(() -> new RecordNotFoundException( idCOurse ) );
    }
    
    
    public Course createCourse( @Valid Course newCourse ){

        System.out.println( newCourse.getName() + newCourse.getCategory() );
        return courseRepository.save( newCourse ); //return ResponseEntity.status(HttpStatus.CREATED).body( courseRepository.save( newCourse ) );
    }

    
    public Course update( @NotNull @Positive Long idCOurse, @Valid Course newCourse) {
        return courseRepository.findById(idCOurse)
                .map(recordFound -> {
                    recordFound.setName(newCourse.getName());
                    recordFound.setCategory(newCourse.getCategory());
                    return courseRepository.save(recordFound);               
                }).orElseThrow(() -> new RecordNotFoundException( idCOurse ) );
    }

    
    public void delete( @NotNull @Positive Long idCOurse) {

        courseRepository.delete( courseRepository.findById(idCOurse)
            .orElseThrow(() -> new RecordNotFoundException( idCOurse ) ) );
    }
  
}
