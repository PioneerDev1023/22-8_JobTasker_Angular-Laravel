import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
@Injectable()
export class LoaderService {
    public isLoading = new BehaviorSubject<boolean>(false)
    public requestCount = 0

    show() {
        this.isLoading.next(true)
    }
    hide() {
        this.isLoading.next(false)
    }
}
