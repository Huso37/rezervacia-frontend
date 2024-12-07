import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router
  ) { }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserId() {
    const user = this.getUser();
    return user?.id || null;
  }

  clearUser() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
