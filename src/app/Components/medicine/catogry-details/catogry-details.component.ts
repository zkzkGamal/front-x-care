import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Aos from 'aos';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-catogry-details',
  templateUrl: './catogry-details.component.html',
  styleUrls: ['./catogry-details.component.scss']
})
export class CatogryDetailsComponent implements OnInit {
  name: any;
  loading:boolean=true
  Category_detail: any;
  search:any=''
  constructor( private cats:AppService , private authentication: AuthService,private toastr: ToastrService, private route:ActivatedRoute) {
    this.route.queryParams.subscribe( params=> {
      this.name = params['name'];

    });
  }

  ngOnInit(): void {
    Aos.init()
    this.getCats_detail()
  }
  getCats_detail(){

    this.scroll()
  this.loading=true

    return this.cats.getCategory_details(this.name).subscribe((res:any)=>{
      this.Category_detail=res
  this.loading=false

    })
  }
  scroll(){
    window.scroll(0,0)
  }

  addtoCart(item:any){

    let form={
      profile:this.authentication.currentUserValue.profile_id,

    }
    if(localStorage.getItem('order_id')){
      let form={
        drugs_order: Number(localStorage.getItem('order_id')) ,
    product:item.id,
    quantity:1
       }
       this.cats.paytoCart(form).subscribe((res:any)=>{
        this.toastr.info('The medicine has been added to the cart')

       })
    }else{
      this.cats.addToCart(form).subscribe((res:any)=>{
        localStorage.setItem('order_id', res.id)
        let form={
         drugs_order: +res.id,
     product:item.id,
     quantity:1
        }
        this.cats.paytoCart(form).subscribe((res:any)=>{
         this.toastr.info('The medicine has been added to the cart')

        })
     })
    }

  }
}
