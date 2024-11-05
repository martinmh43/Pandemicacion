import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-partida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.scss'],
  
})
export class PartidaComponent {
  constructor() { }

  // Aquí agregamos métodos para manejar la lógica de la partida que
  // ya iremos haciendo asi q no rayarse
}
