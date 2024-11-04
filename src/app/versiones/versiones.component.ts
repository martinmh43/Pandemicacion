import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-versiones',
  standalone: true,
  imports: [],
  templateUrl: './versiones.component.html',
  styleUrl: './versiones.component.scss'
})
export class VersionesComponent {
  constructor(private router: Router) {}

  routacion(name: string) {
    this.router.navigate([`/${name}`]);
  }
}
