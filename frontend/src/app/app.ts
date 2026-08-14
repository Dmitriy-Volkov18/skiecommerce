import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasketService } from './_services/basket-service';
import { AccountService } from './_services/account-service';
import { NavBar } from './components/nav-bar/nav-bar';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavBar,
    NgxSpinnerModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    constructor(private basketService: BasketService, private accountService: AccountService){}
  
    ngOnInit(): void {
      this.loadBasket();
      this.loadCurrentUser();
    }
  
    loadBasket(){
      const basketId = localStorage.getItem("basket_id"); 
      if(basketId){
        this.basketService.getBasket(basketId).subscribe(() => {
        console.log("initialised basket");
        }, error => {
          console.log(error);
        })
      }
    }
  
    loadCurrentUser(){
    const token = localStorage.getItem('token');
    
    if(!token){
      return;
    }
      this.accountService.loadCurrentUser(token).subscribe({
        next: (user) => console.log("loaded user", user),
        error: (err) => console.log("error", err)
      });
    }
}
