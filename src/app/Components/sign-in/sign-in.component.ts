import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as aos from 'aos';
import { jwtDecode } from 'jwt-decode';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    // autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoHeight: true,

    autoplayTimeout:3000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false,
    center:true
  }
  form!: FormGroup;
  submitted: boolean = false;

  constructor(private router:Router,private formbuilder:FormBuilder,  private logIn: AuthService, private toastr: ToastrService,) { }

  ngOnInit(): void {
    aos.init();
    this.form = this.formbuilder.group({
      email:['',[Validators.required , Validators.email ]],
      password:['',Validators.required]
    })
  }
  get f() {return this.form.controls}
  submit(){
    this.submitted = true;
    console.log(this.form)
    if (this.form.invalid) {
      if(this.form.controls['email'].errors){
        this.toastr.error('', 'email is required' ,{
          closeButton: true,
          tapToDismiss:true,
          disableTimeOut:false,
          timeOut: 3000
      });
      }
      if(this.form.controls['password'].errors){
        this.toastr.error('','password is required'   ,{
          closeButton: true,
          tapToDismiss:true,
          disableTimeOut:false,
          timeOut: 3000
      });
      }
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });return
    }
    this.logIn.getUser(this.form.value).subscribe((data: any) => {
      console.log(data)
      if (data.access) {
        localStorage.setItem('access_token', data.access)
        const decoded:any = jwtDecode(data.access)
        console.log(decoded);

        this.toastr.info('Login successful')
        localStorage.setItem('jwt', JSON.stringify(decoded));
        this.logIn.currentUserSubject.next(decoded)
        this.logIn.refreshuser.next(true)
        this.router.navigate(['/'] )
        // window.scroll({ top: 0, left: 0, behavior:'smooth' });
      }

  })
}
}
