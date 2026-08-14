import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrder, IOrderToCreate } from '../_models/order';
import { map, Observable } from 'rxjs';
import { IDeliveryMethod } from '../_models/deliveryMethod';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
    baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(order: IOrderToCreate): Observable<IOrder>{
    return this.http.post<IOrder>(this.baseUrl + "orders", order);
  }

  getDeliveryMethods(){
    return this.http.get<IDeliveryMethod[]>(this.baseUrl + 'orders/deliveryMethods').pipe(
      map((dm: IDeliveryMethod[]) => {
        return dm.sort((a, b) => b.price - a.price);
      })
    );
  }
}
