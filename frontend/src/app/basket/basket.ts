import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../_models/basket';
import { BasketService } from '../_services/basket-service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderTotals } from '../components/order-totals/order-totals';
import { BasketSummary } from '../components/basket-summary/basket-summary';
@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    OrderTotals,
    BasketSummary,
  ],
  templateUrl: './basket.html',
  styleUrl: './basket.css',
})
export class Basket {
  basket$!: Observable<IBasket | null>
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  removeBasketItem(item: IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item: IBasketItem){
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IBasketItem){
    this.basketService.decrementItemQuantity(item);
  }
}
