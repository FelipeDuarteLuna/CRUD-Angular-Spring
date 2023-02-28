import { Course } from './../../model/course';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [ Validators.required, Validators.minLength( 5 ), Validators.maxLength( 200 ) ]],
    category: ['', [ Validators.required ]]
  });

  constructor( private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const course: Course =  this.route.snapshot.data['course'];
    console.log(course);
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    });

   }

  onSalve(){
    this.service.save(this.form.value).subscribe(
      result => {
        return this.onSuccess();
      },
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

  getErrorMessage( fieldName: string ){
    const field = this.form.get( fieldName );

    if( field?.hasError('required') ){
      return 'Campo obrigatório';
    }

    if( field?.hasError('minlength') ){
      const requiredLength  = field.errors ? field.errors['minlength']['requiredLength'] : 5 ;
      return `Tamanho mínimo precisa ser de ${ requiredLength } caracteres.` ;
    }

    if( field?.hasError('maxlength') ){
      const requiredLength  = field.errors ? field.errors['maxlength']['requiredLength'] : 5 ;
      return `Tamanho máximo excedido de ${ requiredLength } caracteres.` ;
    }

    return 'Campo Inválido';
  }
}
