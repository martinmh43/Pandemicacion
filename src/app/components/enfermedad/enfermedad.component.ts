import { Component } from '@angular/core';

@Component({
  selector: 'app-enfermedad',
  standalone: true,
  imports: [], 
  templateUrl: './enfermedad.component.html',
  styleUrls: ['./enfermedad.component.scss'] 
})
export class EnfermedadComponent {
  
  id: number = 0;
  nombre: string = '';

  constructor() {
  }
}
