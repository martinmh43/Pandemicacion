import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

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
  ciudadSeleccionada: any = null;
  primeraRonda: boolean = true;
  consolaMensajes: string[] = [];
  textoBoton: string = 'Empezar partida';
  haSidoClicado: boolean = false;


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
        conexiones: ciudad.conexiones,
        enfermedades: ciudad.enfermedades 
      }));

      this.puntos = this.ciudades.map(ciudad => ({
        ciudad: ciudad.nombre,
        x: ciudad.coordenadasX,
        y: ciudad.coordenadasY,
        enfermedades: ciudad.enfermedades
      }));

      console.log('Puntos procesados:', this.puntos);
    }, error => {
      console.error('Error al cargar ciudades', error);
    });
  }

  onPuntoClick(punto: any) {
    this.ciudadSeleccionada = punto;
    console.log(`Has hecho clic en: ${punto.ciudad}`);
  }
  
  cerrarInfo() {
    this.ciudadSeleccionada = null;
  }

  pasarDeRonda() {
    if (this.primeraRonda) {
      this.asignarNivelesAleatorios(10, 1);
      this.asignarNivelesAleatorios(8, 2);
      this.asignarNivelesAleatorios(3, 3);
      this.primeraRonda = false;
      this.textoBoton = 'Ronda Siguiente';
      this.haSidoClicado = true;
    } else {
      this.sumarNivelAleatorio();
    }
  }

  asignarNivelesAleatorios(cantidad: number, nivel: number) {
    const ciudadesAleatorias = this.obtenerCiudadesAleatorias(cantidad);
    ciudadesAleatorias.forEach(ciudad => {
      const enfermedadAleatoria = this.obtenerEnfermedadAleatoria(ciudad.enfermedades);
      if (enfermedadAleatoria) {
        enfermedadAleatoria.nivel = nivel;
        this.consolaMensajes.push(`${ciudad.nombre} tiene la enfermedad ${enfermedadAleatoria.nombre} en nivel ${nivel}.`);
      }
    });
  }

  obtenerCiudadesAleatorias(cantidad: number): any[] {
    const ciudadesCopias = [...this.ciudades];
    const ciudadesSeleccionadas = [];
    for (let i = 0; i < cantidad; i++) {
      if (ciudadesCopias.length === 0) break;
      const indiceAleatorio = Math.floor(Math.random() * ciudadesCopias.length);
      ciudadesSeleccionadas.push(ciudadesCopias[indiceAleatorio]);
      ciudadesCopias.splice(indiceAleatorio, 1);
    }
    return ciudadesSeleccionadas;
  }

  obtenerEnfermedadAleatoria(enfermedades: any[]): any | null {
    if (enfermedades.length === 0) return null; 
    const indiceAleatorio = Math.floor(Math.random() * enfermedades.length);
    return enfermedades[indiceAleatorio];
  }

  sumarNivelAleatorio() {
    const ciudadesAleatorias = this.obtenerCiudadesAleatorias(5);
  
    ciudadesAleatorias.forEach(ciudad => {
      const enfermedadAleatoria = this.obtenerEnfermedadAleatoria(ciudad.enfermedades);
  
      if (enfermedadAleatoria && enfermedadAleatoria.nivel < 3) {
        enfermedadAleatoria.nivel += 1;
        this.consolaMensajes.push(`${ciudad.nombre} tiene la enfermedad ${enfermedadAleatoria.nombre} en nivel ${enfermedadAleatoria.nivel}.`);
      }
    });
  }

  getColorClass(enfermedades: any[]): string {
    let maxNivel = 0;
  
    for (const enfermedad of enfermedades) {
      if (enfermedad.nivel > maxNivel) {
        maxNivel = enfermedad.nivel;
      }
    }
  
    switch (maxNivel) {
      case 1:
        return 'nivel-1';
      case 2:
        return 'nivel-2';
      case 3:
        return 'nivel-3'; 
      default:
        return ''; 
    }
  }
}