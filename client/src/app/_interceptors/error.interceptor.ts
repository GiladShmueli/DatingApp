import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error =>{
        if (error) {
          switch(error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for(const key in error.error.errors){
                  if(error.error.errors[key])
                    modalStateErrors.push(error.error.errors[key]);
                }
                throw modalStateErrors.flat();
              } else {
                this.toastr.error("Bad Request", error.status); //manually fixed the error.statusText
                //apparantly asp.net removed the statusText property https://readdy.net/Notes/Details/1973
                // either that is the problem or the fact that we "solved" the issue.
                // a better way to handle this would be enum or something alike to keep it cleaner and clearer, 
                // or to find another way online, but I want to progress more.
              }
            break;
            case 401:
              console.log(error);
              this.toastr.error("Unauthorized", error.status);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}};
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toastr.error('something went wrong');
              console.log(error);
            break;
          }
        }
        return throwError(error); //we shouldn't ever hit this
      }
    ));
  }
}
