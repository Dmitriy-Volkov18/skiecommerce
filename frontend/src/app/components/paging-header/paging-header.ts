import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paging-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './paging-header.html',
  styleUrl: './paging-header.css',
})
export class PagingHeader {
  @Input() pageNumber: number = 0;
  @Input() pageSize: number = 0;
  @Input() totalCount: number = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

}
