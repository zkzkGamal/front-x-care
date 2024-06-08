import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'x_care';

  constructor(private router :Router){
    this.router.events.subscribe((event:any)=>{
      if(event instanceof NavigationEnd){
       window.scrollTo(0,0)
      }
    })

  }

}
