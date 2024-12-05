import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  credentials = { username: '', password: '' };

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login error', err);
        console.log(this.credentials)
        alert('Invalid credentials');
      }
    });
  }
}
