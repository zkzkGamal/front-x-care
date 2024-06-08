import { MedicineModule } from './Components/medicine/medicine.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { CartComponent } from './Components/home/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },

  {
    path:'Home',
    loadChildren: () => import('./Components/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'Medicine',
    loadChildren: () => import('./Components/medicine/medicine.module').then(m => m.MedicineModule)
  },
  {
    path:'Doctors',
    loadChildren: () => import('./Components/doctors/doctors.module').then(m => m.DoctorsModule)
  },

  {
    path:'sign_in',
    component:SignInComponent
  },
  {
    path:'sign_up',
    component:SignUpComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
