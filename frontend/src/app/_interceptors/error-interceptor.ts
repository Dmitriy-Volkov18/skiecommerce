import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      switch (error.status) {
        case 400:
          if (error.error?.errors) {
            return throwError(() => error.error);
          }
          toastr.error(error.error?.message ?? 'Bad request', '400');
          break;

        case 401:
          toastr.error(error.error?.message ?? 'Unauthorized', '401');
          break;

        case 404:
          router.navigateByUrl('/not-found');
          break;

        case 500:
          const extras: NavigationExtras = {
            state: { error: error.error }
          };
          router.navigateByUrl('/server-error', extras);
          break;
      }

      return throwError(() => error);
    })
  );
};


// @Injectable({
//   providedIn: 'root',
// })
// export class ErrorInterceptor implements HttpInterceptor {
//     constructor(private router: Router, private toastr: ToastrService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
//     return next.handle(request).pipe(
//       catchError(error => {
//         if(error){
//           if(error.status === 400){
//             if(error.error.errors){
//               throw error.error;
//             }
//             else{
//               this.toastr.error(error.error.message, error.error.statusCode);
//             }
//           }
//           if(error.status === 401){
//             this.toastr.error(error.error.message, error.error.statusCode);
//           }
//           if(error.status == 404){
//             this.router.navigateByUrl("/not-found");
//           }

//           if(error.status === 500){
//             const navigationextras: NavigationExtras = {state: {error: error.error}};
//             this.router.navigateByUrl("/server-error", navigationextras);
//           }
//         }

//         return throwError(() => new Error(error));
//       })
//     );
//   }
// }
