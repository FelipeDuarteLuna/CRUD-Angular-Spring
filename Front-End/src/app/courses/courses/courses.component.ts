import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { CoursesService } from '../services/courses.service';

import { Course } from './../model/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {

    this.courses$ = this.coursesService.listCoursesAll()
    .pipe(
      catchError(error =>{
        this.onError('Erro ao carregar cursos');
        return of([])
      })
      );

  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })};


  ngOnInit(): void {
  }

  //onAdd(){
  //  console.log('onAdd');
  //  this.router.navigate( ['new'], {relativeTo: this.route});
  //}

}
;
