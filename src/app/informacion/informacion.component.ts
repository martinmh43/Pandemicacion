import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.scss'
})
export class InformacionComponent {
  constructor(private router: Router) {}

  routacion(name: string) {
    this.router.navigate([`/${name}`]);
  }
}
