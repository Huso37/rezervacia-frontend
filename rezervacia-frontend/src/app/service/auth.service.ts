import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://Huso38.pythonanywhere.com'; 

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(user: { username: string, email: string, password: string, phone: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
}
