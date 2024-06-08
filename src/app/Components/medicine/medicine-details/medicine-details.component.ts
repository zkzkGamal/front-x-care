import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Aos from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.scss']
})
export class MedicineDetailsComponent implements OnInit {
  loading:boolean=true;
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
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
  name: any;
  medicine_details: any;
  quantity: any=1;
  constructor( private cats:AppService , private authentication: AuthService,private toastr: ToastrService,private spinner: NgxSpinnerService , private route:ActivatedRoute) {
    this.route.queryParams.subscribe( params=> {
            this.name = params['name'];

          });
   }

  ngOnInit(): void {
    Aos.init()
this.medicine_detail(this.name)

  }
  scroll(){
    window.scroll(0,0)
  }
  medicine_detail(name:any){
    this.spinner.show()
    return this.cats.getmedicine_details(name).subscribe((res:any)=>{
    console.log(res);
  this.medicine_details=res
  this.spinner.hide()
  this.loading=false
    })
  }
  addtoCart(item:any){

    var form={
      profile:this.authentication.currentUserValue.profile_id,

    }
    if(localStorage.getItem('order_id')){
      let form={
        drugs_order:Number(localStorage.getItem('order_id')) ,
    product:item.id,
    quantity:this.quantity
       }
       this.cats.paytoCart(form).subscribe((res:any)=>{
        this.toastr.info('The medicine has been added to the cart')

       })
    }else{
       this.cats.addToCart(form).subscribe((res:any)=>{
        localStorage.setItem('order_id', res.id)
        var form={
         drugs_order: res.id,
     product:item.id,
     quantity:this.quantity
        }
        this.cats.paytoCart(form).subscribe((res:any)=>{
         this.toastr.info('The medicine has been added to the cart')

        })
     })
    }
  }
  decrease(){
    if(this.quantity==1){
    this.quantity=1
  }else
  this.quantity=this.quantity-1
  }
  increase(){

  this.quantity=this.quantity+1

}
}
