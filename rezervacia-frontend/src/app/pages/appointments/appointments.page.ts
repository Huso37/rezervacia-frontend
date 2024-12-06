import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/service/appointment.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {

  barberId!: number;
  user: any;
  selectedDate!: string;
  appointments: any[] = [];
  times: string[] = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  constructor(
    private route: ActivatedRoute, 
    private appointmentService: AppointmentService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.setDefaultDate();
    this.barberId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchAppointments();
  }

  setDefaultDate() {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0];
  }

  fetchAppointments() {
    console.log("hello fetch", this.barberId, this.selectedDate);
    this.appointmentService.getAppointments(this.barberId, this.selectedDate).subscribe({
      next: (data) => {
        const bookedTimes = data.map((a: any) => a.start_time.slice(0, 5));

        this.appointments = this.times.filter((time) => !bookedTimes.includes(time));

      },
      error: (err) => {
        console.error('Error fetching appointments', err);
      },
    });
  }


  onDateChange(event: any) {
    this.selectedDate = event.detail.value.split('T')[0];
    console.log("kkt", this.selectedDate = event.detail.value.split('T')[0]);
    this.fetchAppointments();
  }

  bookAppointment(start_time: string) {
    console.log("kkt");
    const userId = this.userService.getUserId();
    this.appointmentService.bookAppointment({
      barber_id: this.barberId,
      user_id: userId,
      date: this.selectedDate,
      start_time,
    }).subscribe({
      next: () => {
        alert('Appointment booked successfully!');
        this.fetchAppointments();
      },
      error: (err) => {
        console.error('Error booking appointment', err);
        const errorMessage = err.error.error;
        alert(`Failed to book appointment. ${errorMessage}`);
      },
    });
  }

  
  getCardColor(time: string): string {
    const appointment = this.appointments.find((a) => a.time === time);
    return appointment?.status === 'booked' ? 'danger' : 'light';
  }

}
