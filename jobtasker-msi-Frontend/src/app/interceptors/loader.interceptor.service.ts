import { LoaderService } from './../servies/loader.service'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { finalize } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptorService {

    constructor(public loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let params = req.url.split('?')
        if (params.length > 1) {
            params = params[1].split('&')
        }

        if (params.indexOf('no-loader=true') < 0) {
            this.loaderService.requestCount++
            this.loaderService.show()

            return next.handle(req).pipe(
                finalize( () => {
                    this.loaderService.requestCount--
                    if (this.loaderService.requestCount === 0) {
                        this.loaderService.hide()
                    }
                })
            )
        } else {
            req = req.clone({
                url: req.url.split('?')[0]
            })

            return next.handle(req)
        }
    }
}
