import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../../_models/basket';
import { BasketService } from '../../_services/basket-service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-totals',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './order-totals.html',
  styleUrl: './order-totals.css',
})
export class OrderTotals {
  basketTotal$!: Observable<IBasketTotals | null>;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketTotal$ = this.basketService.basketTotal$;
  }

}
