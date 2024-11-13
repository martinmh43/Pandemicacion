import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-partida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.scss'],
  
})
export class PartidaComponent {


  constructor(private router: Router) {}

  routacion(name: string) {
    this.router.navigate([`/${name}`]);
  }

    dataStrings: string[] = [
      "San Francisco;0;235,315;Chicago,Los Angeles,Manila,Tokio",
      "Chicago;0;300,280;San Francisco,Montreal,Atlanta,Mexico DF,Los Angeles",
      "Atlanta;0;320,320;Chicago,Miami,Washington",
      "Montreal;0;350,280;Chicago,Nueva York,Washington",
      "Nueva York;0;380,290;Montreal,Washington,Londres,Madrid",
      "Washington;0;360,330;Montreal,Nueva York,Atlanta,Miami",
      "Londres;0;700,230;Nueva York,Madrid,Paris,Essen",
      "Madrid;0;687,290;Nueva York,Londres,Paris,Sao Paulo,Argel",
      "Paris;0;727,250;Madrid,Londres,Essen,Argel,Milan",
      "Essen;0;755,190;Londres,Paris,San Petersburgo,Milan"
    ];
  
    puntos: { ciudad: string; x: number; y: number }[] = [];
  
    ngOnInit() {
      for (let i = 0; i < this.dataStrings.length; i++) {
        const line = this.dataStrings[i];
        const partes = line.split(';');
        const ciudad = partes[0];
        const [x, y] = partes[2].split(',').map(Number); 
  
        this.puntos.push({ ciudad, x, y });
      }
    }
}
