import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { urls } from '../../../environments/environment';

@Injectable()
export class DataService {
    myPpaymentHistory() {
      throw new Error('Method not implemented.');
    }
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
        const url = `${this.baseUrl}/register`;

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
        const url = `${this.baseUrl}/get`;

        return this.http.get<any>(url);
    }

    // Profile
    get(): Observable<any> {
        const url = `${this.baseUrl}/profile`;

        return this.http.get<any>(url);
    }

    myJobList(): Observable<any> {
        const url = `${this.baseUrl}/my-job-post`;

        return this.http.get<any>(url);
    }

    myJobListCompleted(): Observable<any> {
        const url = `${this.baseUrl}/my-job-post-completed`;

        return this.http.get<any>(url);
    }

    myJobListCompletedPoster(): Observable<any> {
        const url = `${this.baseUrl}/my-job-post-completed-poster`;

        return this.http.get<any>(url);
    }
    myJobOffer(id: any): Observable<any> {
        const url = `${this.baseUrl}/my-job-post-offer/${id}`;

        return this.http.get<any>(url);
    }

    assignedJob(params: any): Observable<any> {
        const url = `${this.baseUrl}/assign-job`;

        return this.http.post<any>(url, params);
    }

    completeJob(params: any): Observable<any> {
        const url = `${this.baseUrl}/complete-job`;

        return this.http.post<any>(url, params);
    }

    myTaskerJob(): Observable<any> {
        const url = `${this.baseUrl}/my-tasker-job`;

        return this.http.get<any>(url);
    }

    paymentRequest(params: any): Observable<any> {
        const url = `${this.baseUrl}/payment-request`;

        return this.http.post<any>(url, params);
    }

    getMySkill(): Observable<any> {
        const url = `${this.baseUrl}/my-skill`;

        return this.http.get<any>(url);
    }

    getMyCategory(): Observable<any> {
        const url = `${this.baseUrl}/my-category`;

        return this.http.get<any>(url);
    }

    getSkillList(): Observable<any> {
        const url = `${this.baseUrl}/skill-list`;

        return this.http.get<any>(url);
    }

    getMyCategoryList(): Observable<any> {
        const url = `${this.baseUrl}/category-list`;

        return this.http.get<any>(url);
    }

    addSkill(params: any): Observable<any> {
        const url = `${this.baseUrl}/add-new-skill`;

        return this.http.post<any>(url, params);
    }

    updateSkill(params: any): Observable<any> {
        const url = `${this.baseUrl}/skill-update`;

        return this.http.post<any>(url, params);
    }

    updateCategory(params: any): Observable<any> {
        const url = `${this.baseUrl}/category-update`;

        return this.http.post<any>(url, params);
    }

    createDispute(params: any): Observable<any> {
        const url = `${this.baseUrl}/create-dispute`;

        return this.http.post<any>(url, params);
    }

    getIFilledDispute(): Observable<any> {
        const url = `${this.baseUrl}/get-dispute-by-me`;

        return this.http.get<any>(url);
    }

    getDisputeAgainestMe(): Observable<any> {
        const url = `${this.baseUrl}/get-dispute-againest-me`;

        return this.http.get<any>(url);
    }

    addPaymentMethod(params: any): Observable<any> {
        const url = `${this.baseUrl}/add-payment-method`;

        return this.http.post<any>(url, params);
    }

    getPyamentMethod(): Observable<any> {
        const url = `${this.baseUrl}/get-payment-methods`;

        return this.http.get<any>(url);
    }

    addBank(params: any): Observable<any> {
        const url = `${this.baseUrl}/tasker-bank`;

        return this.http.post<any>(url, params);
    }

    getBank(): Observable<any> {
        const url = `${this.baseUrl}/my-bank`;

        return this.http.get<any>(url);
    }

    updateBank(params: any): Observable<any> {
        const url = `${this.baseUrl}/update-tasker-bank`;

        return this.http.post<any>(url, params);
    }

    payments(params: any): Observable<any> {
        const url = `${this.baseUrl}/paid-tran`;

        return this.http.post<any>(url, params);
    }

    myTransectiondetail(): Observable<any> {
        const url = `${this.baseUrl}/get-my-payment-tran`;

        return this.http.get<any>(url);
    }

    myRecetiondetail(): Observable<any> {
        const url = `${this.baseUrl}/get-my-receive-tran`;

        return this.http.get<any>(url);
    }


    addportfolio(params: any): Observable<any> {
        const url = `${this.baseUrl}/tasker-portfolio`;

        return this.http.post<any>(url, params);
    }

    getportfolio(): Observable<any> {
        const url = `${this.baseUrl}/my-portfolio`;

        return this.http.get<any>(url);
    }

    updateportfolio(params: any): Observable<any> {
        const url = `${this.baseUrl}/update-tasker-portfolio`;

        return this.http.post<any>(url, params);
    }

    // Badges

    addbadges(params: any): Observable<any> {
        const url = `${this.baseUrl}/tasker-badges`;

        return this.http.post<any>(url, params);
    }

    getbadges(): Observable<any> {
        const url = `${this.baseUrl}/my-badges`;

        return this.http.get<any>(url);
    }

    updatebadges(params: any): Observable<any> {
        const url = `${this.baseUrl}/update-tasker-badges`;

        return this.http.post<any>(url, params);
    }


    addReview(params: any): Observable<any> {
        const url = `${this.baseUrl}/add_review`;

        return this.http.post<any>(url, params);
    }
    getReviews(params: any): Observable<any> {
        const url = `${this.baseUrl}/get_reviews/${params}`;

        return this.http.get<any>(url);
    }
    
    addTaskerReview(params: any): Observable<any> {
        const url = `${this.baseUrl}/add_tasker_review`;

        return this.http.post<any>(url, params);
    }
    getTaskerReview(params: any): Observable<any> {
        const url = `${this.baseUrl}/get_tasker_reviews/${params}`;

        return this.http.get<any>(url, params);
    }
    getPosterReview(params: any): Observable<any> {
        const url = `${this.baseUrl}/get_poster_reviews/${params}`;

        return this.http.get<any>(url, params);
    }
}
