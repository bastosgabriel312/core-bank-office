import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenKey = 'auth_token';
  private readonly googleClientId = environment.googleClientId;;

  constructor(private userService: UserService, private router: Router) { }

  initializeGoogleLogin(buttonId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const checkGoogle = () => {
        if (typeof google !== 'undefined') {
          google.accounts.id.initialize({
            client_id: this.googleClientId,
            callback: (response: any) => this.handleCredentialResponse(response),
            auto_select: true,
            cancel_on_tap_outside: false
          });

          google.accounts.id.renderButton(
            document.getElementById(buttonId),
            { theme: 'outline', size: 'large' }
          );

          resolve();
        } else {
          setTimeout(checkGoogle, 100);
        }
      };

      checkGoogle();
    });
  }


  private handleCredentialResponse(response: any) {
    const payload = this.decodeJwt(response.credential);

    const user: User = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      avatarUrl: payload.picture
    };

    this.userService.setUser(user, response.credential);
    sessionStorage.setItem(this.tokenKey, response.credential);
    this.router.navigate(['/home']);
  }

  private decodeJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  logout() {
    this.userService.logout();
  }

}
