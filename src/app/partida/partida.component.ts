import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-partida',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.scss'],
})
export class PartidaComponent {
  ciudades: any[] = [];
  puntos: any[] = []; 

  constructor(private http: HttpClient, private router: Router) {}

  routacion(name: string) {
    this.router.navigate([`/${name}`]);
  }

  ngOnInit() {
    this.procesarDatosCiudades();
  }

  procesarDatosCiudades() {
    this.http.get<any[]>('assets/ciudades.json').subscribe(data => { 
      console.log('Datos de ciudades:', data); 
      this.ciudades = data.map(ciudad => ({
        nombre: ciudad.nombre.trim(),
        idEnfermedad: ciudad.idEnfermedad,
        coordenadasX: ciudad.coordenadas.x,
        coordenadasY: ciudad.coordenadas.y,
        conexiones: ciudad.conexiones
      }));

      this.puntos = this.ciudades.map(ciudad => ({
        ciudad: ciudad.nombre,  
        x: ciudad.coordenadasX, 
        y: ciudad.coordenadasY  
      }));

      console.log('Puntos procesados:', this.puntos); 
    }, error => {
      console.error('Error al cargar ciudades', error);
    });
  }

  onPuntoClick(ciudad: string) {
    console.log(`Has hecho clic en: ${ciudad}`); 
  }

  // Las movidas de cada ciudad aquí



}