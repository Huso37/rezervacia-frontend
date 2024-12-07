import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    private userService: UserService,
    private toastController: ToastController
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
    if (!this.isWeekday(this.selectedDate)) {
      this.appointments = [];
      return;
    }

    this.appointmentService.getAppointments(this.barberId, this.selectedDate).subscribe({
      next: (data) => {
        const bookedTimes = data.map((a: any) => a.start_time.slice(0, 5));

        this.appointments = this.times.filter((time) => !bookedTimes.includes(time));

      },
      error: (err) => {
        console.error('Error fetching appointments', err);
        this.presentToast('Chyba pri načítavaní termínov!');
      },
    });
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value.split('T')[0];
    if (!this.isWeekday(this.selectedDate)) {
      this.appointments = [];
      return;
    }
  
    this.fetchAppointments();
  }

  bookAppointment(start_time: string) {
    const userId = this.userService.getUserId();
    this.appointmentService.bookAppointment({
      barber_id: this.barberId,
      user_id: userId,
      date: this.selectedDate,
      start_time,
    }).subscribe({
      next: () => {
        this.presentToast('Úspešne zarezervovaný termín!');
        this.fetchAppointments();
        this.appointmentService.setAppointmentAdded(true);
      },
      error: (err) => {
        const errorMessage = err.error.error;
        this.presentToast(`Neúspešne zarezervovaný termín! ${errorMessage}`);
      },
    });
  }

  isWeekday(dateString: string): boolean {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0 && utcDay !== 6;
  };

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom', 
    });
    toast.present();
  }
}
