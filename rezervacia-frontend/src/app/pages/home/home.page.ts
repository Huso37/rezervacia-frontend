import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/service/appointment.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  appointments: any[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchUserAppointments();
  }

  ionViewWillEnter() {
    if (this.appointmentService.getAppointmentAdded()) {
      this.fetchUserAppointments();
      this.appointmentService.setAppointmentAdded(false);
    }
  }

  fetchUserAppointments() {
    const userId = this.userService.getUserId();

    this.appointmentService.getUserAppointments(userId).subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => {
        console.error('Error fetching user appointments:', err);
      },
    });
  }

  goBarber() {
    this.router.navigate(['/barbers']);
  }

  logOut() {
    this.userService.clearUser();
  }
  
}
