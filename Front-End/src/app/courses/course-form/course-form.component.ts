import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { NonNullableFormBuilder } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });

  constructor( private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location) {

  }

  ngOnInit(): void {
  }

  onSalve(){
    alert("Button Salvar");
    this.service.save(this.form.value).subscribe(
      result => this.onSuccess(),
       error => this.onerror()
       );
  }

  onCancel(){
    this.location.back();
  }

  private onerror(){
    return this._snackBar.open( "Erro ao Salvar Curso.", "" ,{ duration: 3000 });
  }

  private onSuccess(){
    this.onCancel();
    return this._snackBar.open("Curso salvo com sucesso!", "", { duration:5000 });
  }
}
