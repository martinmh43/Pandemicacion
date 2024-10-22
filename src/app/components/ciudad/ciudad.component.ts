import { Component } from '@angular/core';

@Component({
  selector: 'app-ciudad',
  standalone: true,
  imports: [],
  templateUrl: './ciudad.component.html',
  styleUrl: './ciudad.component.scss'
})
export class CiudadComponent {

  nombre : String | null = null;
  coordX : number = 0;
  coordY : number = 0;
  adyacentes : String[] = [];
  infRoja : number = 0;
  infVerde : number = 0;
  infAzul : number = 0;
  infAmarilla : number = 0;
  poblacion : number = 100;

  curarCiudad(inf : number) : number{
    if(inf>0) {
      inf--;
    }
    return inf;
  }

  curarCiudadVacuna(inf : number) : number {
    if (inf > 1) {
      //Hola
      inf =inf - 2;
    } else if (inf ==1) {
      inf--;
    }
    return inf;
  }

  bombardear() : void {
    this.poblacion = 10;
    this.infRoja = 0;
    this.infVerde = 0;
    this.infAzul = 0;
    this.infAmarilla = 0;
  }

  cerrarCamino() : void {
    //Ni idea de que hacer pa, tan solo se que necesito 
    //ese fichero de ciudades
  }


}
