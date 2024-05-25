import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] 
})
export class NavbarComponent implements AfterViewInit, OnInit {
  isAdmin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.authloginnav();
  }

  ngAfterViewInit() {
    const showDrawerBtn = document.getElementById('showDrawerBtn');
    const hideDrawerBtn = document.querySelector('[data-drawer-hide="drawer-top-example"]');

    // Open drawer when show button is clicked
    showDrawerBtn?.addEventListener('click', () => {
      const drawer = document.getElementById('drawer-top-example');
      drawer?.classList.toggle('-translate-y-full');
    });

    // Close drawer when hide button is clicked
    hideDrawerBtn?.addEventListener('click', () => {
      const drawer = document.getElementById('drawer-top-example');
      drawer?.classList.add('-translate-y-full');
    });
  }

  navigate(url: string): void {
    if (url === 'Products') {
      this.router.navigateByUrl(`home/${url}`);
    }
  }

  authloginnav() {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('role');
      if (role === 'Admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }
  }
  logOut() {
    if (typeof window !== 'undefined') {

      sessionStorage.removeItem('authToken');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.router.navigate(['home']);
      window.location.reload();
    }
  }
  // navigateTo(page: string): void {
  //   switch (page) {
  //     case 'MyOrder': {
  //       this.router.navigateByUrl('usersetting/myorder');
  //       break;
  //     }
  //     case 'MySubscription': {
  //       this.router.navigateByUrl('usersetting/MySubscription');
  //       break;
  //     }
  //     case 'ManageReferral': {
  //       this.router.navigateByUrl('usersetting/ManageReferral');
  //       break;
  //     }
  //     case 'MyWishlist' : {
  //        this.router.navigateByUrl('usersetting/MyWishlist')
  //        break;
  //     }
  //     default: {
  //       console.error(`Unknown page: ${page}`);
  //       break;
  //     }
  //   }
  // }
}
