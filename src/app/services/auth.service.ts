import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    refreshuser = new BehaviorSubject<boolean>(
      false
    );
    constructor(private router: Router,private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(`jwt`) || '{}'));
      this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): any {
      if(this.currentUserSubject.value != null) { return this.currentUserSubject.value }
    }

  getUser(form:any){
    return this.http.post(`https://ai-x-care.future-developers.cloud/accounts/login/` , form)
   }
   createUser(form:any){
    return this.http.post(`https://ai-x-care.future-developers.cloud/accounts/register/` , form)
   }
}
