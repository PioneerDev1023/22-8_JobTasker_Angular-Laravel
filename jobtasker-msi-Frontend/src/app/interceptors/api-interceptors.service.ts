import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ApiInterceptorsService implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const apiToken = localStorage.getItem('apitoken');
        if (apiToken) {
            const clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${apiToken}`
                }
            });

            return next.handle(clonedReq);
        } else {
            return next.handle(req);
        }
    }
}