import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  showPassword: boolean = false;
  showLoginPassword: boolean = false;

  togglePasswordVisibility(type: string): void {
    if (type === 'register') {
      this.showPassword = !this.showPassword;
    } else if (type === 'login') {
      this.showLoginPassword = !this.showLoginPassword;
    }
  }
  constructor(private router: Router) {}

  routacion(name: string) {
    this.router.navigate([`/${name}`]);
  }
}
