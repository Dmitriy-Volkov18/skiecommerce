import { Routes } from '@angular/router';
import { Home } from './home/home';
import { TestError } from './_errors/test-error/test-error';
import { ServerError } from './_errors/server-error/server-error';
import { NotFound } from './_errors/not-found/not-found';
import { AuthGuard } from './_guards/auth-guard';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'test-error', component: TestError},
  {path: 'server-error', component: ServerError},
  {path: 'not-found', component: NotFound},
  {path: 'shop', loadChildren: () => import('./shop/shop.routes').then(r => r.shopRoutes)},
  {path: 'basket', loadChildren: () => import('./basket/basket.routes').then(r => r.basketRoutes)},
  {path: 'checkout', canActivate: [AuthGuard], loadChildren: () => import('./checkout/checkout.routes').then(r => r.checkoutRoutes)},
  {path: 'orders', canActivate: [AuthGuard], loadChildren: () => import('./order/order.routes').then(r => r.orderRoutes)},
  {path: 'account', loadChildren: () => import('./account/account.routes').then(r => r.accountRoutes)},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];