import { Component, signal } from '@angular/core';
import { IOrder } from '../_models/order';
import { OrderService } from '../_services/order-service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  orders = signal<IOrder[] | null>([]);
  
  constructor(private ordersService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrdersForUser().subscribe((orders: IOrder[]) => {
      this.orders.set(orders);
    }, error => {
      console.log("dasd",error);
    })
  }
}
