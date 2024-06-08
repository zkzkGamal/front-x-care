import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, filter } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  url: any='';
  constructor(private authenticationService: AuthService ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const currentUser = this.authenticationService?.currentUserValue;
      const isLoggedIn:any =localStorage.getItem('access_token');

      console.log('currentUser',currentUser , isLoggedIn)
      console.log('===============JwtInterceptor=============')
console.log(request.url , request.method , window.location.href);
console.log(window.location.href.split('/').pop());
      if (isLoggedIn) {
if((window.location.href.split('/').pop()!='Blogs')){
  request = request.clone({
    setHeaders: {

        Authorization: `Bearer ${isLoggedIn}`
    }
});

}
if((window.location.href.split('/').pop()=='Blogs')&&request.method =='POST'){
  request = request.clone({
    setHeaders: {

        Authorization: `Bearer ${isLoggedIn}`
    }
});

}


      }
      return next.handle(request);
  }
}
