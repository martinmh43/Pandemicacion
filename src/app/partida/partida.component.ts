import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { Vacuna } from '../models/vacuna.model';

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
  curacionesDisponibles: number = 5;

  vacunas: Vacuna[] = [
    { nombre: 'Vacuna Mondongo-20', desarrollada: false, rondasParaDesarrollo: 0 },
    { nombre: 'Vacuna Denge-Venge', desarrollada: false, rondasParaDesarrollo: 0 },
    { nombre: 'Vacuna Skibidi', desarrollada: false, rondasParaDesarrollo: 0 },
];


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
      this.calcularLineasConexiones();

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
    this.consolaMensajes = [];
    if (this.primeraRonda) {
        this.asignarNivelesAleatorios(10, 1);
        this.asignarNivelesAleatorios(8, 2);
        this.asignarNivelesAleatorios(3, 3);
        this.primeraRonda = false;
        this.textoBoton = 'Ronda Siguiente';
        this.haSidoClicado = true;
    } else {
        this.sumarNivelAleatorio();
        this.curacionesDisponibles = 5;

        //vacunas
        this.vacunas.forEach(vacuna => {
            if (vacuna.desarrollada) {
                vacuna.rondasParaDesarrollo -= 1;
                if (vacuna.rondasParaDesarrollo <= 0) {
                    this.consolaMensajes.push(`La vacuna ${vacuna.nombre} está lista. Puedes usarla.`);
                }
            }
        });
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


  lineas: any[] = [];

  calcularLineasConexiones() {
    this.lineas = [];
  
    this.ciudades.forEach(ciudad => {
      const ciudadOrigen = this.puntos.find(p => p.ciudad === ciudad.nombre);
  
      ciudad.conexiones.forEach((conexion: string) => { 
        const ciudadDestino = this.puntos.find(p => p.ciudad === conexion);
  
        if (ciudadOrigen && ciudadDestino) {
          this.lineas.push({
            x1: ciudadOrigen.x,
            y1: ciudadOrigen.y,
            x2: ciudadDestino.x,
            y2: ciudadDestino.y
          });
        }
      });
    });
  }

  curarEnfermedad(ciudad: any, enfermedad: any) {
    if (this.curacionesDisponibles > 0 && enfermedad.nivel > 0) {
      enfermedad.nivel -= 1;
      this.curacionesDisponibles -= 1;
      this.consolaMensajes.push(`${ciudad.nombre} ha sido curada de ${enfermedad.nombre}. Nivel actual: ${enfermedad.nivel}.`);
    } else if (enfermedad.nivel === 0) {
      this.consolaMensajes.push(`La enfermedad ${enfermedad.nombre} en ${ciudad.nombre} ya está en nivel 0.`);
    } else {
      this.consolaMensajes.push('No hay clics de curación disponibles.');
    }
  }

  desarrollarVacuna(index: number) {
    const vacuna = this.vacunas[index];
    if (this.curacionesDisponibles >= 5 && !vacuna.desarrollada) {
        this.curacionesDisponibles -= 5;
        vacuna.rondasParaDesarrollo = Math.floor(Math.random() * 4) + 4; // Entre 4 y 7 rondas
        vacuna.desarrollada = true;
        this.consolaMensajes.push(`${vacuna.nombre} en desarrollo. Tardará ${vacuna.rondasParaDesarrollo} rondas.`);
    } else if (vacuna.desarrollada) {
        this.consolaMensajes.push(`${vacuna.nombre} ya está en desarrollo.`);
    } else {
        this.consolaMensajes.push('No tienes suficientes curaciones para desarrollar una vacuna.');
    }
}
  
  vacunaDesarrollada(enfermedad: any): boolean {
    const vacuna = this.vacunas.find(v => v.nombre === `Vacuna ${enfermedad.nombre}`);
    return vacuna ? vacuna.desarrollada : false;
}

vacunarEnfermedad(ciudad: any, enfermedad: any) {
  const vacuna = this.vacunas.find(v => v.nombre === `Vacuna ${enfermedad.nombre}`);

  if (this.curacionesDisponibles >= 4) {
    this.curacionesDisponibles -= 4;
  if (vacuna && vacuna.desarrollada && vacuna.rondasParaDesarrollo <= 0) {
      enfermedad.nivel = 0; 
      this.consolaMensajes.push(`La vacuna usada en ${enfermedad.nombre} en ${ciudad.nombre}`);
  } else if (vacuna && vacuna.desarrollada) {
      this.consolaMensajes.push(`La vacuna para ${enfermedad.nombre} aún no está lista`);
  } else {
      this.consolaMensajes.push(`La vacuna para ${enfermedad.nombre} no está desarrollada`);
  }
}
}
}