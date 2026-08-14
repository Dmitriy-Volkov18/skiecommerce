import { Component, computed, signal } from '@angular/core';
import { IOrder } from '../../_models/order';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../_services/order-service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-detailed',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './order-detailed.html',
  styleUrl: './order-detailed.css',
})
export class OrderDetailed {
  order = signal<IOrder | null>(null);
  readonly orderItems = computed(() => this.order()?.orderItems ?? []);

  constructor(private route: ActivatedRoute, private ordersService: OrderService) { }

  ngOnInit(): void {
    this.ordersService.getOrderDetailed(+this.route.snapshot.paramMap.get('id')!).subscribe({
      next: (order) => this.order.set(order),
      error: (error) => console.log(error)
    })
  }

}
