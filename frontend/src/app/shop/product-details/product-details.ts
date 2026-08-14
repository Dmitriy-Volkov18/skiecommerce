import { Component, signal } from '@angular/core';
import { IProduct } from '../../_models/product';
import { BasketService } from '../../_services/basket-service';
import { ShopService } from '../../_services/shop-service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  product = signal<IProduct | null>(null);
  quantity = 1;
  productLoading = signal(false);

  constructor(private basketService: BasketService, private shopService: ShopService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product()!, this.quantity);
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    if(this.quantity > 1){
      this.quantity--;
    }
  }
  
  loadProduct(){
    this.productLoading.set(true)
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.activatedRoute.snapshot)
    this.shopService.getProduct(id).subscribe({
      next: (product) => {
        if (product) {
          this.product.set(product);
          this.productLoading.set(false)
        } else {
          console.log("Product not found");
        }
      },
      error: (err) => console.error(err)
    });
  }

}
