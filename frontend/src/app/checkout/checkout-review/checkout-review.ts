import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket } from '../../_models/basket';
import { BasketService } from '../../_services/basket-service';
import { ToastrService } from 'ngx-toastr';
import { CdkStepper } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasketSummary } from '../../components/basket-summary/basket-summary';

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BasketSummary
  ],
  templateUrl: './checkout-review.html',
  styleUrl: './checkout-review.css',
})
export class CheckoutReview {
  //@Input() appStepper!: CdkStepper;
  basket$!: Observable<IBasket | null>;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  createPaymentIntent(){
    return this.basketService.createPaymentIntent().subscribe({
      next: () => console.log("created"),
      //next: () => this.appStepper.next(),
      error: (error) => console.log(error)
    })
  }

}
