package com.fdl.crudspring.model;

import org.hibernate.annotations.ManyToAny;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Lesson {
    
    @Id
    @GeneratedValue( strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @Column( length = 100, nullable = false)
    private String name;

    @Column( length = 11, nullable = false)
    private String youtubeUrl;

    @ManyToOne( fetch = FetchType.LAZY, optional = false)
    @JoinColumn( name = "course_id", nullable = false)
    private Course course;
}
