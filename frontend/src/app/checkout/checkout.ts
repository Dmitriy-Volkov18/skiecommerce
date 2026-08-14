import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../_models/basket';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BasketService } from '../_services/basket-service';
import { AccountService } from '../_services/account-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderTotals } from '../components/order-totals/order-totals';
import { CheckoutPayment } from './checkout-payment/checkout-payment';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CheckoutReview } from './checkout-review/checkout-review';
import { CheckoutDelivery } from './checkout-delivery/checkout-delivery';
import { CheckoutAddress } from './checkout-address/checkout-address';
import { Stepper } from '../components/stepper/stepper';
import { MatStepperModule } from '@angular/material/stepper';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    OrderTotals,
    CheckoutAddress,
    CheckoutDelivery,
    CheckoutReview,
    CheckoutPayment,
    Stepper,
    CdkStepperModule,
    MatStepperModule
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  basketTotals$!: Observable<IBasketTotals | null>;
  checkoutForm!: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressFormValues();
    this.getDeliveryMethodValue();
    this.basketTotals$ = this.basketService.basketTotal$;
  }

  createCheckoutForm(){
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required]
      })
    });
  }

  getAddressFormValues(){
    this.accountService.getUserAddress().subscribe(address => {
      if(address){
        this.checkoutForm.get('addressForm')?.patchValue(address);
      }
    }, error => {
      console.log(error);
    })
  }

  getDeliveryMethodValue(){
    const basket = this.basketService.getCurrentBasketValue();
    if(basket && basket.deliveryMethodId){
      this.checkoutForm.get("deliveryForm")?.get("deliveryMethod")?.patchValue(basket.deliveryMethodId.toString());
    }
  }
}
