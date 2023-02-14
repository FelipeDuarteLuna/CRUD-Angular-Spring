package com.fdl.crudspring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fdl.crudspring.model.Course;
import com.fdl.crudspring.repository.CourseRepository;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {

    private final CourseRepository courseRepository;

    //@RequestMapping(method = RequestMethod.GET)
    @GetMapping
    public @ResponseBody List<Course> list() {
        return courseRepository.findAll();
    }

    @GetMapping("/{idCOurse}")
    public ResponseEntity <Course> findById(@PathVariable Long idCOurse){

        return courseRepository.findById(idCOurse)
                .map( record -> ResponseEntity.ok().body(record) )
                .orElse(ResponseEntity.notFound().build());
    }

    //@RequestMapping( method = RequestMethod.POST)
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Course createCourse( @RequestBody Course newCourse ){

        System.out.println( newCourse.getName() + newCourse.getCategory() );

        return courseRepository.save( newCourse );
        //return ResponseEntity.status(HttpStatus.CREATED).body( courseRepository.save( newCourse ) );
    }
    
}
