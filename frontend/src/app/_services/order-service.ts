import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../_models/order';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
    baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrdersForUser(): Observable<IOrder[]>{
    return this.http.get<IOrder[]>(this.baseUrl + 'orders');
  }

  getOrderDetailed(id: number) : Observable<IOrder>{
    return this.http.get<IOrder>(this.baseUrl + 'orders/' + id);
  }
}
