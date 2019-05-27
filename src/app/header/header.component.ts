import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navBarCollapsed = true;

  constructor(private authService: AuthService) { 
    window.onresize = () => this.navBarCollapsed = true;
   }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
      return this.authService.isAuthenticated();
  } 
 
  toggleNavBarCollapsing() {
    this.navBarCollapsed = !this.navBarCollapsed;
  }

}
