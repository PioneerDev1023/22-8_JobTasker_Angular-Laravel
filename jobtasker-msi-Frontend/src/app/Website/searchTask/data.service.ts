import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { urls } from '../../../environments/environment';

@Injectable()
export class DataService {
    private baseUrl = `${urls.BaseUrl}`;
    private data = new BehaviorSubject<Array<any>>([{fetching: true}]);
    data$ = this.data.asObservable();

    constructor(public http: HttpClient) {
    }

    updateSource(newData: any) {
        this.data.next(newData);
    }

    updateItem(item: any, index: number): void {
        this.data.getValue()[index] = item;
    }

    addItem(item: any): void {
        this.data.getValue().push(item);
    }

    getItem(index: number) {
        return this.data.getValue()[index];
    }

    deleteItem(index: number) {
        const afterDel: any = [];
        this.data.getValue().forEach( (item: any, i: number) => {
            if (i !== index) {
                afterDel.push(item);
            }
        })
        this.updateSource(afterDel);
    }

    save(params: any): Observable<any> {
        const url = `${this.baseUrl}/job-question`;

        return this.http.post<any>(url, params);
    }

    saveOffer(params: any): Observable<any> {
        const url = `${this.baseUrl}/job-offer`;

        return this.http.post<any>(url, params);
    }

    update(params: any): Observable<any> {
        const url = `${this.baseUrl}/update`;

        return this.http.put<any>(url, params);
    }

    delete(index: number): Observable<any> {
        const url = `${this.baseUrl}/delete/${this.getItem(index).id}`;

        return this.http.delete<any>(url);
    }

    list(): Observable<any> {
        const url = `${this.baseUrl}/get-job-list`;

        return this.http.get<any>(url);
    }

    getJobPost(id: any): Observable<any> {
        const url = `${this.baseUrl}/get-job/${id}`;

        return this.http.get<any>(url);
    }

    addReport(params: any): Observable<any> {
        const url = `${this.baseUrl}/job-report`;

        return this.http.post<any>(url, params);
    }

    // Filters
    priceHighLow(): Observable<any> {
        const url = `${this.baseUrl}/get-job-list-price-high-low`;

        return this.http.get<any>(url);
    }
    priceLowHigh(): Observable<any> {
        const url = `${this.baseUrl}/get-job-list-price-low-high`;

        return this.http.get<any>(url);
    }
    dueDateEarly(): Observable<any> {
        const url = `${this.baseUrl}/get-job-list-price-due-dateearliest`;

        return this.http.get<any>(url);
    }
    dueDateLast(): Observable<any> {
        const url = `${this.baseUrl}/get-job-list-price-due-datelast`;

        return this.http.get<any>(url);
    }
    oldTask(): Observable<any> {
        const url = `${this.baseUrl}/get-job-list-old-task`;

        return this.http.get<any>(url);
    }
    clostToMe(): Observable<any> {
        const url = `${this.baseUrl}/get-job-list-closest-to-me`;

        return this.http.get<any>(url);
    }

}
