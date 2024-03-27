import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { CoursesService } from '../services/courses.service';
import { Course } from './../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver  {

  constructor(private service: CoursesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    if (route.params && route.params['id']) {
      console.log('Passou no cancativate do guardião - ID:' + route.params['id']);
      return this.service.loadById(route.params['id']);
    }

    console.log('Passou no cancativate do guardião NOVO - ID:' + route.params['id']);
    return of({ _id: '', name: '', category: '' });
  }

}
