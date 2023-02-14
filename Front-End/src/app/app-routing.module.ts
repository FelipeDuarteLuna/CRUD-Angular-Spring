import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses/containers/courses/courses.component';

const routes: Routes = [
    { path: '', pathMatch:'full', redirectTo: 'courses' },
    { path: 'courses',
     loadChildren: ()=> import('./courses/courses.module').then( m => m.CoursesModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
