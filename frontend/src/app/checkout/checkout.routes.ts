import { Routes } from "@angular/router";
import { Checkout } from "./checkout";
import { CheckoutSuccess } from "./checkout-success/checkout-success";

export const checkoutRoutes: Routes = [
  {path: "", component: Checkout},
  {path: "success", component: CheckoutSuccess},
]