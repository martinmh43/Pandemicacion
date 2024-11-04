import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.scss'
})
export class AutoresComponent {
  constructor(private router: Router) {}

  routacion(name: string) {
    this.router.navigate([`/${name}`]);
  }
}
