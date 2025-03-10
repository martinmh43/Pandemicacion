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
  rondas: number =0;
  enfermedadesEliminadas: string[] = [];
  

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
    this.rondas++;

    const ciudadesConNivel3 = this.ciudades.filter(ciudad => 
      ciudad.enfermedades.some((enfermedad: { nivel: number; }) => enfermedad.nivel === 3)
  );

  if (ciudadesConNivel3.length >= 10) {
    alert(`¡Has perdido! Aguantaste ${this.rondas} rondas.`);
    this.reiniciarJuego();
    return; 
}

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

    const todasLasCiudadesCuradas = this.ciudades.every(ciudad => 
      ciudad.enfermedades.every((enfermedad: { nivel: number; }) => enfermedad.nivel === 0)
  );

  if (todasLasCiudadesCuradas) {
      alert(`¡Has ganado! Has curado todas las enfermedades y sobreviviste ${this.rondas} rondas.`);
      this.reiniciarJuego();
      return; 
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

  //al pasar de ronda y en la primera que en ciudades ramdom se genere una nueva enfermedad
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
    const enfermedadesDisponibles = enfermedades.filter(e => !this.enfermedadesEliminadas.includes(e.nombre));
    if (enfermedadesDisponibles.length === 0) return null; 
    const indiceAleatorio = Math.floor(Math.random() * enfermedadesDisponibles.length);
    return enfermedadesDisponibles[indiceAleatorio];
  }

  sumarNivelAleatorio() {
    const ciudadesAleatorias = this.obtenerCiudadesAleatorias(5);
  
    ciudadesAleatorias.forEach(ciudad => {
      const enfermedadAleatoria = this.obtenerEnfermedadAleatoria(ciudad.enfermedades);
  
      if (enfermedadAleatoria) {
        if (enfermedadAleatoria.nivel < 3) {
          enfermedadAleatoria.nivel += 1;
          this.consolaMensajes.push(`${ciudad.nombre} tiene la enfermedad ${enfermedadAleatoria.nombre} en nivel ${enfermedadAleatoria.nivel}.`);
        } else {
          // Pasa la enfermedad a ciudades adyacentes si ya esta a nivel 3
          ciudad.conexiones.forEach((nombreCiudadVecina: string) => {
            const ciudadVecina = this.ciudades.find(c => c.nombre === nombreCiudadVecina);
            if (ciudadVecina) {
              const enfermedadEnVecina = ciudadVecina.enfermedades.find((e: { nombre: string; nivel: number }) => e.nombre === enfermedadAleatoria.nombre);
              if (enfermedadEnVecina && enfermedadEnVecina.nivel < 3) {
                enfermedadEnVecina.nivel += 1;
                this.consolaMensajes.push(`La enfermedad ${enfermedadEnVecina.nombre} se propagó de ${ciudad.nombre} a ${ciudadVecina.nombre}. Nivel actual: ${enfermedadEnVecina.nivel}.`);
              }
            }
          });
        }
      }
    });
  }

  //colores para los distintos niveles de enfermedad
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
      
      // Verificar si la enfermedad ha sido completamente eliminada
      const enfermedadSigueExistiendo = this.ciudades.some(c => 
        c.enfermedades.some((e: { nombre: string; nivel: number }) => e.nombre === enfermedad.nombre && e.nivel > 0)
      );

      if (!enfermedadSigueExistiendo && !this.enfermedadesEliminadas.includes(enfermedad.nombre)) {
        this.enfermedadesEliminadas.push(enfermedad.nombre);
        this.consolaMensajes.push(`La enfermedad ${enfermedad.nombre} ha sido erradicada del mapa y no volverá a aparecer.`);
      }
    } else if (enfermedad.nivel === 0) {
      this.consolaMensajes.push(`La enfermedad ${enfermedad.nombre} en ${ciudad.nombre} ya está en nivel 0.`);
    } else {
      this.consolaMensajes.push('No hay clics de curación disponibles.');
    }
  }


  //desarrollar la vacuna, tarda aleatoriaente entre 4 y 7 rondas, a suertes
  desarrollarVacuna(index: number) {
    const vacuna = this.vacunas[index];
    if (this.curacionesDisponibles >= 5 && !vacuna.desarrollada) {
        this.curacionesDisponibles -= 5;
        vacuna.rondasParaDesarrollo = Math.floor(Math.random() * 4) + 4; // entre 4 y 7 rondas
        vacuna.desarrollada = true;
        this.consolaMensajes.push(`${vacuna.nombre} en desarrollo. Tardará ${vacuna.rondasParaDesarrollo} rondas.`);
    } else if (vacuna.desarrollada) {
        this.consolaMensajes.push(`${vacuna.nombre} ya está en desarrollo.`);
    } else {
        this.consolaMensajes.push('No tienes suficientes curaciones para desarrollar una vacuna.');
    }
}
  //se muestran los botones de vacunar cuando esa vacuna esta desarrollada
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
      this.consolaMensajes.push(`La vacuna usada del ${enfermedad.nombre} ha sido un exito`);
  } else if (vacuna && vacuna.desarrollada) {
      this.consolaMensajes.push(`La vacuna para ${enfermedad.nombre} aún no está lista`);
  } else {
      this.consolaMensajes.push(`La vacuna para ${enfermedad.nombre} no está desarrollada`);
  }
}
}

reiniciarJuego() {
  this.ciudades = [];
  this.puntos = [];
  this.ciudadSeleccionada = null;
  this.primeraRonda = true;
  this.consolaMensajes = [];
  this.textoBoton = 'Empezar partida';
  this.haSidoClicado = false;
  this.curacionesDisponibles = 5;
  this.vacunas.forEach(vacuna => {
      vacuna.desarrollada = false;
      vacuna.rondasParaDesarrollo = 0;
  });
  this.asignarNivelesAleatorios(10, 1);
  this.asignarNivelesAleatorios(8, 2);
  this.asignarNivelesAleatorios(3, 3);  this.rondas = 0;
  this.procesarDatosCiudades(); 
}




}