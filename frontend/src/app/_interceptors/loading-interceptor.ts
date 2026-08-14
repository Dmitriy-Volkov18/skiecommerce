import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusyService } from '../_services/busy-service';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
  
    constructor(private busyService: BusyService) {}
  
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      if(request.method === "POST" && request.url.includes("orders")){
        return next.handle(request);
      }
  
      if(request.method === 'DELETE')
      {
        return next.handle(request);
      }
  
      if(request.url.includes('emailexists')){
        return next.handle(request);
      }
      
      this.busyService.busy();
  
      return next.handle(request).pipe(
        finalize(() => {
          this.busyService.idle();
        })
      )
    }
}
