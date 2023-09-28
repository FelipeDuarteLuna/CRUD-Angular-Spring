package com.fdl.crudspring.service;

import java.util.List;
import java.util.stream.Collectors;

import com.fdl.crudspring.dto.CourseDTO;
import com.fdl.crudspring.dto.mapper.CourseMapper;
import com.fdl.crudspring.exception.RecordNotFoundException;
import com.fdl.crudspring.model.Course;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.fdl.crudspring.repository.CourseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CourseService {
    
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    //Constructors
    public CourseService ( CourseRepository courseRepository, CourseMapper courseMapper ){
        
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    //Method's
    public List<CourseDTO> list() {

        return courseRepository.findAll()
                .stream()
                .map(courseMapper::toDTO)
                .collect(Collectors.toList());
    }

    
    public CourseDTO findById( @NotNull @Positive Long idCOurse){

        return courseRepository.findById(idCOurse)
                    .map(courseMapper::toDTO)
                    .orElseThrow(() -> new RecordNotFoundException( idCOurse ) );
    }
    
    
    public CourseDTO createCourse( @Valid @NotNull CourseDTO newCourse ){

        return  courseMapper.toDTO(courseRepository.save(  courseMapper.toEntity(newCourse) ) );
    }

    
    public CourseDTO update( @NotNull @Positive Long idCOurse, @Valid @NotNull CourseDTO newCourse) {
        return courseRepository.findById(idCOurse)
                .map(recordFound -> {
                    Course course = courseMapper.toEntity(newCourse);
                    recordFound.setName(newCourse.name());
                    recordFound.setCategory( this.courseMapper.convertCategoryValue( newCourse.category() ) );
                    recordFound.getLessons().clear();
                    course.getLessons().forEach(recordFound.getLessons()::add);
                    return courseMapper.toDTO( courseRepository.save(recordFound) );               
                }).orElseThrow(() -> new RecordNotFoundException( idCOurse ) );
    }

    public void delete( @NotNull @Positive Long idCOurse) {

        courseRepository.delete( courseRepository.findById(idCOurse)
            .orElseThrow(() -> new RecordNotFoundException( idCOurse ) ) );
    }
  
}
