import { Router } from '@angular/router';
import { ApiService } from '../servies/api.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorsInterceptorService implements HttpInterceptor {

    constructor(private api: ApiService, private router: Router) { }

    intercept(req: any, next : any) {
        return next.handle(req)
        .pipe(
            catchError(err => {
                if (err.status === 401) {
                    this.api.logOut();
                    this.router.navigateByUrl('login');
                } else {
                    //this.router.navigate(['404'], {queryParams: {message: 'Errors Interceptor'}})
                }
                const error = err.error.message || err.statusText;

                return throwError(error);
            })
        )
    }
}
