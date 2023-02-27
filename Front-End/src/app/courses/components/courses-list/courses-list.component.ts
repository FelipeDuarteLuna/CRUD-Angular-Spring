import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter( false );
  @Output() edit = new EventEmitter( false );
  @Output() remove = new EventEmitter( false );

  readonly displayedColumns = ['_id','name','category','actions'];

  constructor( ){ }

  ngOnInit(): void {
  }

  onAdd(){
    this.add.emit( true );
  }

  onEdit(courses: Course){

    this.edit.emit( courses );
  }

  onDelete( courses: Course ){

    this.remove.emit( courses );

  }

}
