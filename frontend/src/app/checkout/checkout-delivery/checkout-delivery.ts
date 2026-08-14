import { Component, Input, signal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IDeliveryMethod } from '../../_models/deliveryMethod';
import { CheckoutService } from '../../_services/checkout-service';
import { BasketService } from '../../_services/basket-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout-delivery',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './checkout-delivery.html',
  styleUrl: './checkout-delivery.css',
})
export class CheckoutDelivery {
  @Input() checkoutForm!: FormGroup;
  deliveryMethods= signal<IDeliveryMethod[]>([]);
  
  constructor(private checkoutService: CheckoutService, private basketService: BasketService) { }
  
  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: (dm: IDeliveryMethod[]) => this.deliveryMethods.set(dm),
      error: (err) => console.log(err)
    })
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod){
    this.basketService.setShippingPrice(deliveryMethod);
  }

}
