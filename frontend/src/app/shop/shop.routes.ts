import { Routes } from "@angular/router";
import { Shop } from "./shop";
import { ProductDetails } from "./product-details/product-details";

export const shopRoutes: Routes = [
  {path: '', component: Shop},
  {path: ':id', component: ProductDetails},
]