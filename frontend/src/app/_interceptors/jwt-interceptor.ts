import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    console.log('INLINE INTERCEPTOR RUNNING, token=', token);
    if (token) {
        req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
    }
    return next(req);
}


// @Injectable({
//   providedIn: 'root',
// })
// export class JwtInterceptor implements HttpInterceptor {
//       intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const token = localStorage.getItem("token");

//         if(token){
//             console.log('JWT INTERCEPTOR RUNNING, TOKEN = ', token);

//             req = req.clone({
//                 setHeaders: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//         }

//         return next.handle(req);
//     }

// }
