import { Injectable } from '@angular/core';
import { map, of, ReplaySubject, tap } from 'rxjs';
import { IUser } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IAddress } from '../_models/address';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
    baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient, private router: Router) { }

  loadCurrentUser(token: string){
    if(token === null){
      this.currentUserSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${token}`);
    return this.http.get<IUser>(this.baseUrl + 'account', {headers}).pipe(
      tap(user => {
        if (user) {
        this.currentUserSource.next(user);
        localStorage.setItem('token', user.token);
      } else {
        this.currentUserSource.next(null);
      }
      }),
      map(user => user as IUser | null)
    )
  }

  login(values: any){
    return this.http.post<IUser>(this.baseUrl + "account/login", values).pipe(
      map((user: IUser) => {
        if(user){
          localStorage.setItem("token", user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(values: any){
    return this.http.post<IUser>(this.baseUrl + "account/register", values).pipe(
      map((user: IUser) => {
        if(user){
          localStorage.setItem("token", user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  logout(){
    localStorage.removeItem("token");
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string){
    return this.http.get(this.baseUrl + "account/emailexists?email=" + email);
  }

  getUserAddress(){
    const token = localStorage.getItem('token');
    
   
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${token}`);
    return this.http.get<IAddress>(this.baseUrl + 'account/address', {headers});
  }

  updateUserAddress(address: IAddress){
    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }
}
