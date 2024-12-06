import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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
    localStorage.removeItem('token');
  }
}
