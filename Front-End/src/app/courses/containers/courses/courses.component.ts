import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/error-dialog/confirmation-dialog/confirmation-dialog.component';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]> | null = null;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,) {

    this.refresh();

  }

  refresh(){
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

  onAdd(){
    console.log('onAdd');
    this.router.navigate( ['new'], {relativeTo: this.route});
  }

  OnEdit( course: Course){
    this.router.navigate( ['edit', course._id], {relativeTo: this.route});
  }

  onRemove( course: Course){

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza, que deseja remover esse curso ?",
    });

    dialogRef.afterClosed().subscribe( (result: boolean) => {
      if( result){

        this.coursesService.remove( course._id ).subscribe(
          () =>{
            this.refresh();
            this._snackBar.open("Curso removido com sucesso!", "X", {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'});
          },
          error => this.onError("Erro ao tentar remover curso !"));

      }

    });

  }

}

