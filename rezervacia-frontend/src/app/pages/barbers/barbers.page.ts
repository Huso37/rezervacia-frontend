import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/service/appointment.service';

@Component({
  selector: 'app-barbers',
  templateUrl: './barbers.page.html',
  styleUrls: ['./barbers.page.scss'],
})
export class BarbersPage implements OnInit {

  barbers: any[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.appointmentService.getBarbers().subscribe({
      next: (data) => {
        this.barbers = data;
      },
      error: (err) => {
        console.error('Error fetching barbers', err);
      },
    });
  }

  selectBarber(barberId: number) {
    this.router.navigate(['/appointments', barberId]);
  }

}
