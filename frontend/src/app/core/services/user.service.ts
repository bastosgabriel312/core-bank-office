import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private router: Router) { }

  setUser(user: User, token: string) {
    this.currentUserSubject.next(user);
    sessionStorage.setItem('auth_token', token);
  }

  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  logout() {
    this.currentUserSubject.next(null);
    sessionStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
