import { Component, OnInit } from '@angular/core';
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
    private userService: UserService
  ) { }

  ngOnInit() {
    this.fetchUserAppointments();
  }

  fetchUserAppointments() {
    const userId = this.userService.getUserId();

    if (!userId) {
      console.error('User ID not found!');
      return;
    }

    this.appointmentService.getUserAppointments(userId).subscribe({
      next: (data) => {
        console.log('User appointments:', data);
        this.appointments = data;
      },
      error: (err) => {
        console.error('Error fetching user appointments:', err);
      },
    });
  }
  
}
