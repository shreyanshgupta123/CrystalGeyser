import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
constructor(private route:Router) {}
ngAfterViewInit() {
  const showDrawerBtn = document.getElementById('showDrawerBtn');
  const hideDrawerBtn = document.querySelector('[data-drawer-hide="drawer-top-example"]');

  // Open drawer when show button is clicked
  showDrawerBtn?.addEventListener('click', () => {
    const drawer = document.getElementById('drawer-top-example');
    drawer?.classList.toggle('-translate-y-full'); // Toggles the visibility of the drawer
  });

  // Close drawer when hide button is clicked
  hideDrawerBtn?.addEventListener('click', () => {
    const drawer = document.getElementById('drawer-top-example');
    drawer?.classList.add('-translate-y-full'); // Close the drawer by adding the -translate-y-full class
  });
}
navigate(url:string):void{
  if(url=='Products'){
    this.route.navigateByUrl(`home/${url}`)
  }
}



}
