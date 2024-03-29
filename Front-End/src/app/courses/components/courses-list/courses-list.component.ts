import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Course } from '../../model/course';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIcon, MatMiniFabButton, MatIconButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, CategoryPipe]
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
