import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = 'https://Huso38.pythonanywhere.com'; 

  private appointmentAdded = new BehaviorSubject<boolean>(false);
  appointmentAdded$ = this.appointmentAdded.asObservable();

  constructor(private http: HttpClient) { }

  getBarbers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/barbers`);
  }
  getAppointments(barberId: number, date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/appointments?barber_id=${barberId}&date=${date}`);
  }

  bookAppointment(appointment: { barber_id: number; user_id: number; date: string; start_time: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/appointments`, appointment);
  }

  getUserAppointments(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/appointments?user_id=${userId}`);
  }

  setAppointmentAdded(state: boolean) {
    this.appointmentAdded.next(state);
  }

  getAppointmentAdded(): boolean {
    return this.appointmentAdded.getValue();
  }
}
