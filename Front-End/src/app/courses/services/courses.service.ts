import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs/operators';

import { Course } from './../model/course';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

    //private readonly API = '/assets/courses.json';
    private readonly API = 'api/courses';


  constructor( private httpClient: HttpClient ) { }

  listCoursesAll(){

    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      delay(3000),
      tap(courses => console.log(courses))
    ) ;
  }

  loadById( id:string ){
      return this.httpClient.get<Course>(`${this.API}/${id}`);
  }


  save(record: Partial<Course>) { //save(record: Course){
    console.log("Service Course ", record);
    return this.httpClient.post<Course>( this.API, record)
            .pipe(first());
  }

}
