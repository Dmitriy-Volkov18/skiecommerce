import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pager',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PaginationModule
  ],
  templateUrl: './pager.html',
  styleUrl: './pager.css',
})
export class Pager {
  @Input() totalCount: number = 0;
  @Input() pageSize: number = 0;
  @Input() pageNumber: number = 0;
  @Output() pageChanged = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onPagerChange(event: any){
    this.pageChanged.emit(event.page);
  }

}
