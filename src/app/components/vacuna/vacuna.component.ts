import { Component } from '@angular/core';

@Component({
  selector: 'app-vacuna',
  standalone: true,
  imports: [],
  templateUrl: './vacuna.component.html',
  styleUrl: './vacuna.component.scss'
})
export class VacunaComponent {

  tipo : String | null = null;
  avance : number = 0;
  completada : boolean = false;


  progresa() : void {
    if (!this.completada) {
      this.avance++;
    } else {
      alert('La vacuna ya esta lita');
    }
  }

}
