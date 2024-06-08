import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }
  // medicinesService
  getCategorys(){
    return this.http.get(`https://ai-x-care.future-developers.cloud/category/drug/`)
   }
   getCategory_details(name:any){
    return this.http.get(`https://ai-x-care.future-developers.cloud/drug/category/${name}`)
   }
   getmedicine_details(name:any){
    return this.http.get(`https://ai-x-care.future-developers.cloud/drug/${name}`)
   }
   addToCart(user_id:any){
    return this.http.post(`https://ai-x-care.future-developers.cloud/orders/`,user_id)
   }
   getOrders(id:any){
    return this.http.get(`https://ai-x-care.future-developers.cloud/orders/items/`)
   }
   paytoCart(form:any){
    return this.http.post(`https://ai-x-care.future-developers.cloud/orders/items/`,form)
   }
  // medicinesService
  // doctorsService
   getDoctorsSpicials(){
    return this.http.get(`https://ai-x-care.future-developers.cloud/specialist/`)
   }
   getDoctorsInSpicials(specialites_name:any){
    return this.http.get(`https://ai-x-care.future-developers.cloud/accounts/doctors/specialites/${specialites_name}`)
   }
   getDoctor_details(slug:any){

    return this.http.get(`https://ai-x-care.future-developers.cloud/accounts/doctors/${slug}`)
   }
   getDoctor_booking(id:any){

    return this.http.get(`https://ai-x-care.future-developers.cloud/schedule/reservations/${id}`)
   }
   booking(form:any , id:any){

    return this.http.post(`https://ai-x-care.future-developers.cloud/book/reservations`,form)
   }
   // doctorsService
  //  blogs
  showBlogs(){
    return this.http.get(`https://ai-x-care.future-developers.cloud/posts/`)
  }
  // like(form:any){
  //   return this.http.post(`https://ai-x-care.future-developers.cloud/post/like/`, form)
  // }
  // dislike(form:any){
  //   return this.http.post(`https://ai-x-care.future-developers.cloud/post/dislike/`, form)
  // }
  comments(slug:any){
    return this.http.get(`https://ai-x-care.future-developers.cloud/post/comments/${slug}`)
  }
  addComments(slug:any,form:any){
    return this.http.post(`https://ai-x-care.future-developers.cloud/post/comments/${slug}`,form)
  }
  addpost(form:any){

  const formData:FormData = new FormData()
  for (const [key, value] of Object.entries(form)) {
    if((value !='')&&(value !=undefined)) {
      if(key==`media_file`){
        formData.append(`media_file`,form.media_file)
      }else{
        formData.append(key,`${value}`)
      }

  }

}
    return this.http.post(`https://ai-x-care.future-developers.cloud/posts/`,formData)
  }
    //  blogs
}
