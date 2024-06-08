import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user_name:any=''
  user: any={};
  constructor(private authentication: AuthService,private router:Router,private toastr: ToastrService,) {

  }

  ngOnInit(): void {
    this.authentication.refreshuser.subscribe((l:any)=>{
      if(l==true){

        this.user= this.authentication.currentUserValue
console.log(this.user , "authentication");



      }
      // this.getNotif()

    })
    this.user= this.authentication.currentUserValue
console.log(this.user);

     setTimeout(() => {
      this.user_name=this.user.user.username
     }, 0);


  }
  logout(){
    this.user_name=''
    this.toastr.info('logout is successful')
    localStorage.removeItem('access_token')




    localStorage.removeItem('jwt');
   setTimeout(() => {
    this.authentication.currentUserSubject.next(null)
    this.authentication.refreshuser.next(true)
   }, 0);


    this.router.navigate(['/'] )
  }
}
