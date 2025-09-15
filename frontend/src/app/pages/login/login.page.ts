import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { MatProgressSpinner, MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [MatProgressSpinner],
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements AfterViewInit {
  isGoogleButtonLoaded = false;
  google: any;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
      this.authService.initializeGoogleLogin('google-btn').then(() => {
        this.isGoogleButtonLoaded = true;
      });
      if (this.isAuth) {
      this.router.navigate(['/home']);
    }
  }

  get isAuth(): boolean {
    return this.userService.isAuthenticated();
  }
}
