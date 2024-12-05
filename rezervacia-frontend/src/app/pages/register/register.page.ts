import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  user = { username: '', email: '', password: '', phone: '' };

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  register() {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        alert('Registration complete! You can now log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error', err);
        alert(err.error.message || 'Error during registration. Please try again.');
      },
    });
  }
}