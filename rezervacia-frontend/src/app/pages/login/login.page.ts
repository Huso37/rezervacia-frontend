import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    private router: Router,
    private toastController: ToastController
  ) { }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login error', err);
        console.log(this.credentials)
        this.presentToast('Nesprávne údaje');
      }
    });
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom', 
    });
    toast.present();
  }
}
