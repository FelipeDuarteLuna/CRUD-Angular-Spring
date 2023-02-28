package com.fdl.crudspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fdl.crudspring.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}