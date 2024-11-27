import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuarios } from '../models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost//';

  constructor(private http: HttpClient) { }

  register (usuario : usuarios): Observable<any> {
    return this.http.post(this.apiUrl + 'register.php', JSON.stringify(usuario));
  }

  login (usuario : usuarios): Observable<any> {
    return this.http.post(this.apiUrl + 'login.php', JSON.stringify(usuario));
  }





}