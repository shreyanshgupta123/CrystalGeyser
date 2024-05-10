import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
constructor(private route:Router) {

}
navigate(url:string):void{
  if(url=='Products'){
    this.route.navigateByUrl(`home/${url}`)
  }
}



}
