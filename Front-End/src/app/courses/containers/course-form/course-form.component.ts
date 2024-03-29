import { Course } from './../../model/course';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatError, MatHint, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
    standalone: true,
    imports: [MatCard, MatToolbar, MatCardContent, ReactiveFormsModule, MatFormField, MatInput, MatError, MatHint, MatLabel, MatSelect, MatOption, MatIconButton, MatIcon, MatPrefix, MatCardActions, MatButton]
})
export class CourseFormComponent implements OnInit {

  form!: FormGroup;

  constructor( private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService) {

  }

  ngOnInit(): void {
    const course: Course =  this.route.snapshot.data['course'];
    console.log("Retorno da API(BackEnd):", course);

    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [ Validators.required, Validators.minLength( 5 ), Validators.maxLength( 200 ) ]],
      category: [course.category, [ Validators.required ]],
      lessons: this.formBuilder.array( this.retrieveLessons( course ), Validators.required)
    });

    console.log("Formulario", this.form);
    console.log("Valor do Formulário:", this.form.value);
   }

   private retrieveLessons(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [ Validators.required, Validators.minLength( 5 ), Validators.maxLength( 200 ) ]],
      youtubeUrl: [lesson.youtubeUrl, [ Validators.required, Validators.minLength( 10 ), Validators.maxLength( 11 ) ]]
    });
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  addNewLesson(){
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push( this.createLesson() );
  }

  removeLesson( index: number){
      const lessons = this.form.get('lessons') as UntypedFormArray;
      lessons.removeAt( index );
  }

  onSalve(){
    if(this.form.valid){
      this.service.save(this.form.value).subscribe(
        result => {
          return this.onSuccess();
        },
         error => this.onerror()
         );
    }else {
      this.formUtils.validateAllFormFields(this.form);
    }
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
