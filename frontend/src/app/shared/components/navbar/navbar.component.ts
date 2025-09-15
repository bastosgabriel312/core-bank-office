import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isCollapsed = true;

  menuItems = [
    { name: 'Home', icon: 'home', route: '/home', active: false, disabled: false },
    { name: 'Agências', icon: 'apartment', route: '/agencies', active: false, disabled: false },

  ];


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveMenuItems(event.url);
        this.updateTitle(event.url);
      }
    });
  }

  updateActiveMenuItems(url: string): void {
    if (this.isAuthenticated) {
      this.menuItems = [
        { name: 'Home', icon: 'home', route: '/home', active: false, disabled: false },
        { name: 'Agências', icon: 'apartment', route: '/agencies', active: false, disabled: false },
        { name: 'Clientes', icon: 'people', route: '/clients', active: false, disabled: true },
        { name: 'Contas', icon: 'credit_card', route: '/accounts', active: false, disabled: true },
        { name: 'Transações', icon: 'swap_horiz', route: '/transactions', active: false, disabled: true },
      ];
    } else {
      this.menuItems = [
        { name: 'Agências', icon: 'apartment', route: '/public/agencies', active: false, disabled: false },
    { name: 'Login', icon: 'login', route: '/login', active: false, disabled: false },
      ];
  }
    this.menuItems.forEach(item => {
    item.active = item.route === url;
  });
  }

toggleMenu() {
  this.sidenav.toggle();
  this.isCollapsed = false;
}

  get isAuthenticated(): boolean {
  return this.userService.isAuthenticated();
}

  get userName(): string | null {
  const user = this.userService.getUser();
  return user ? user.name : null;
}
logout() {
  this.userService.logout();
  this.router.navigate(['/login']);
}
updateTitle(url: string): void {
  const activeItem = this.menuItems.find(item => item.route === url);
  this.title = activeItem ? activeItem.name : 'Backoffice';
}
}
