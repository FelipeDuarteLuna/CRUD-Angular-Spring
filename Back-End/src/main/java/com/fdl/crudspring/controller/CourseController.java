package com.fdl.crudspring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;

import org.springframework.validation.annotation.Validated;

import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fdl.crudspring.dto.CourseDTO;
import com.fdl.crudspring.service.CourseService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;


@Validated
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    
    private final CourseService courseService;

        public CourseController( CourseService courseService){
            
            this.courseService = courseService;
        }

    
    @GetMapping //@RequestMapping(method = RequestMethod.GET)
    public @ResponseBody List<CourseDTO> list() {
        
        return courseService.list();
    }

    @GetMapping("/{idCOurse}")
    public CourseDTO findById(@PathVariable @NotNull @Positive Long idCOurse){

        return courseService.findById(idCOurse);
    }

    //@RequestMapping( method = RequestMethod.POST)
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public CourseDTO createCourse( @RequestBody @Valid CourseDTO newCourse ){

        return courseService.createCourse( newCourse );
    }


    @PutMapping("/{idCOurse}")
    public CourseDTO update(@PathVariable @NotNull Long idCOurse, @RequestBody @Valid @NotNull CourseDTO newCourse) {
       
        return courseService.update(idCOurse, newCourse);
    }
   
    @DeleteMapping("/{idCOurse}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete (@PathVariable @NotNull @Positive Long idCOurse){
       
        courseService.delete(idCOurse);
    }
}
