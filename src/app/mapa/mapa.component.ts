import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CiudadComponent } from '../components/ciudad/ciudad.component';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CiudadComponent,
    HttpClientModule,
  ],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  ciudades: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.procesarDatosCiudades();
  }

  
  procesarDatosCiudades() {
    this.http.get<any[]>('ciudades.json').subscribe(data => {
      this.ciudades = data.map(ciudad => ({
        nombre: ciudad.nombre.trim(),
        idEnfermedad: ciudad.idEnfermedad,
        coordenadasX: ciudad.coordenadas.x,
        coordenadasY: ciudad.coordenadas.y,
        conexiones: ciudad.conexiones
      }));
    });
  }
}