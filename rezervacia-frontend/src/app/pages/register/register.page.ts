import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) { 
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]], // At least 3 characters
      email: ['', [Validators.required, Validators.email]], // Valid email format
      password: ['', [Validators.required, Validators.minLength(6)]], // Minimum 6 characters
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.presentToast('Registrácia úspešná. Môžete sa prihlásíť');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration error', err);
          const errorMessage = err.error.error;
          this.presentToast(`Neúspešná registrácia. ${errorMessage}`);
        },
      });
    }
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