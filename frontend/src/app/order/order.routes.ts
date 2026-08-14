import { Routes } from "@angular/router";
import { Order } from "./order";
import { OrderDetailed } from "./order-detailed/order-detailed";

export const orderRoutes: Routes = [
  {path: '', component: Order},
  {path: ':id', component: OrderDetailed},
]
