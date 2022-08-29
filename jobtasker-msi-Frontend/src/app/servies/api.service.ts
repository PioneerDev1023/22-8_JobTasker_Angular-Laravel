import { urls } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string;
  loginSource = new BehaviorSubject(false);
  user: any = {
    Id: 0,
    LoginId: '',
    Name: '',
    Email: '',
    Token: '',
    userTypeId: 0
  };

  constructor(public http: HttpClient) {
    this.baseUrl = urls.BaseUrl;
    if (localStorage.getItem('token')) {
        this.user = JSON.parse(localStorage.getItem('user') ?? '');
        this.loginSource.next(true);
    } else {
        this.loginSource.next(false);
    }
  }

  login(params: any): Observable<any> {
    const url = `${this.baseUrl}/login`;

    return this.http.post<any>(url, params)
    .pipe(
        map((resp: any) => {
            if (resp && resp.success && resp.msg) {
                localStorage.setItem('apitoken', resp.msg);
                localStorage.setItem('user', JSON.stringify(resp.data));
                this.user = resp.data;
                this.loginSource.next(true);
            }

            return resp;
        })
    );
  }

  forgotPassword(params: any): Observable<any> {
    const url = `${this.baseUrl}/forgot-password`;
    return this.http.post<any>(url, params)
    .pipe(
        map((resp: any) => {
          return resp;
        })
    );
  }

  resetPassword(params: any): Observable<any> {
    const url = `${this.baseUrl}/reset-password`;
    return this.http.post<any>(url, params)
    .pipe(
        map((resp: any) => {
          return resp;
        })
    );
  }

  changePassword(params: any): Observable<any> {
    const url = `${this.baseUrl}/change-password`;
    const user = JSON.parse(localStorage.getItem('user') ?? '');
    params['user_id'] = user.id;
    return this.http.post<any>(url, params)
    .pipe(
        map((resp: any) => {
          return resp;
        })
    );
  }
  
  updateProfile(params: any): Observable<any> {
    const url = `${this.baseUrl}/update-profile`;
    return this.http.post<any>(url, params)
    .pipe(
        map((resp: any) => {
          return resp;
        })
    );
  }

  loginEmail(params: any): Observable<any> {
    const url = `${this.baseUrl}/loginemail`;

    return this.http.post<any>(url, params)
    .pipe(
        map((resp: any) => {
            if (resp && resp.success && resp.msg) {
                localStorage.setItem('apitoken', resp.msg);
                localStorage.setItem('user', JSON.stringify(resp.data));
                this.user = resp.data;
                this.loginSource.next(true);
            }

            return resp;
        })
    );
  }

  logOut(): boolean {
    localStorage.removeItem('apitoken');
    localStorage.removeItem('user');
    localStorage.removeItem('user_type');
    this.user.id = 0;
    this.loginSource.next(false);

    return true;
  }

  isAuthenticated(): boolean {
      if (localStorage.getItem('apitoken')) {
          return true;
      } else {
          return false;
      }
  }

  isUser(): any {
    if (localStorage.getItem('user')) {
      const us = JSON.parse(localStorage.getItem('user') ?? '');
      return us.userTypeId;
    }
    else { return false; }
  }

  isAdmin(): boolean {
    if (localStorage.getItem('user')) {
      const us = JSON.parse(localStorage.getItem('user') ?? '');
      return (us.userTypeId === 1) ?  true : false;
    }
    else { return false; }
  }

  isPoster(): boolean {
    if (localStorage.getItem('user_type')) {
      const us = (localStorage.getItem('user_type') ?? '');
      return (us == 'poster') ?  true : false;
    }
    else { return false; }
  }

  // Global Lists
  controlAccountHead(): Observable<any> {
    const url = `${this.baseUrl}/accounts/headaccount`;

    return this.http.get<any>(url);
  }

  itemList(): Observable<any> {
    const url = `${this.baseUrl}/data/itemlist`;

    return this.http.get<any>(url);
  }

  vendorList(): Observable<any> {
    const url = `${this.baseUrl}/data/vendorlist`;

    return this.http.get<any>(url);
  }

  clientList(): Observable<any> {
    const url = `${this.baseUrl}/data/clientlist`;

    return this.http.get<any>(url);
  }

  expenseList(): Observable<any> {
    const url = `${this.baseUrl}/data/expense`;

    return this.http.get<any>(url);
  }

  getRegUser() : any {
    const currentUser = JSON.parse(localStorage.getItem('user') ?? '');

    return currentUser;
  }

  getUser(): any {
    const currentUser = JSON.parse(localStorage.getItem('user') ?? '');
    return currentUser
  }

  // getUser(): Observable<any> {
  //   const currentUser = JSON.parse(localStorage.getItem('user') ?? '');
  //   const userid = currentUser.userId;

  //   const url = `${this.baseUrl}/data/ContactList/${userid}`;

  //   return this.http.get<any>(url);
  // }

  // getServerTest(): Observable<any> {
  //   const url = `http://203.99.49.30/WeatherForecast`;

  //   return this.http.get<any>(url);
  // }

  getPersonlChat(userid: any): Observable<any> {
    const url = `${this.baseUrl}/chat/get/${userid}`;

    return this.http.get<any>(url);
  }

  /*
    Following bellow all function are belongs to reports
  */
  getStockReport(): Observable<any> {
    const url = `${this.baseUrl}/reports/stock`;

    return this.http.get<any>(url);
  }

  /*
    Following bellow all function are belongs to Property
  */
 getDepartment(): Observable<any> {
    const url = `${this.baseUrl}/data/departments`;

    return this.http.get<any>(url);
 }

 getDesignation(): Observable<any> {
  const url = `${this.baseUrl}/data/designation`;

  return this.http.get<any>(url);
 }

 getUserAccount(): Observable<any> {
  const url = `${this.baseUrl}/data/useraccount`;

  return this.http.get<any>(url);
 }

 getcallOpt(): Observable<any> {
  const url = `${this.baseUrl}/data/callopt`;

  return this.http.get<any>(url);
 }

 getClientStatus(): Observable<any> {
  const url = `${this.baseUrl}/data/clientstatus`;

  return this.http.get<any>(url);
 }

 getPropertyList(): Observable<any> {
  const url = `${this.baseUrl}/data/property`;

  return this.http.get<any>(url);
 }

 getProjectExpenseList(): Observable<any> {
  const url = `${this.baseUrl}/data/projectexpense`;

  return this.http.get<any>(url);
 }

 getPlan(): Observable<any> {
  const url = `${this.baseUrl}/data/planlist`;

  return this.http.get<any>(url);
 }

 getPlots(): Observable<any> {
  const url = `${this.baseUrl}/data/plots`;

  return this.http.get<any>(url);
 }

 getPlot(Id: any): Observable<any> {
  const url = `${this.baseUrl}/data/plot/${Id}`;

  return this.http.get<any>(url);
 }

 getFeatures(): Observable<any> {
  const url = `${this.baseUrl}/data/feature`;

  return this.http.get<any>(url);
 }

 getAccountChild(Id: any): Observable<any> {
  const url = `${this.baseUrl}/data/accountchild/${Id}`;

  return this.http.get<any>(url);
 }

 getBankList(): Observable<any> {
  const url = `${this.baseUrl}/data/bank`;

  return this.http.get<any>(url);
 }

 getFeedbackHistory(Id: number): Observable<any> {
  const url = `${this.baseUrl}/data/feedbackhistory/${Id}`;

  return this.http.get<any>(url);
 }

 getAccountChildList(): Observable<any> {
  const url = `${this.baseUrl}/data/accountchildlist`;

  return this.http.get<any>(url);
 }
 getProfile(): Observable<any> {
  const url = `${this.baseUrl}/profile`;

  return this.http.get<any>(url);
}
getSettings(){
  const url = `${this.baseUrl}/posts/get-settings`;
  return this.http.get<any>(url);
}

}
