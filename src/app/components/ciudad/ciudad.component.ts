import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ciudad',
  standalone: true,
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.scss']
})
export class CiudadComponent {

  @Input() nombre: string = '';
  @Input() idEnfermedad: number = 0;
  @Input() coordenadasX: number = 0;
  @Input() coordenadasY: number = 0;
  @Input() conexiones: string[] = [];

  constructor() {
  
  }
}
