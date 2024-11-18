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
     "San Francisco;0;239,254;Chicago,Los Angeles,Manila,Tokio",
  "Chicago;0;306,226;San Francisco,Montreal,Atlanta,Mexico DF,Los Angeles",
  "Atlanta;0;326,258;Chicago,Miami,Washington",
  "Montreal;0;357,226;Chicago,Nueva York, Washington",
  "Nueva York;0;387,234;Montreal,Washington,Londres,Madrid",
  "Washington;0;367,266;Montreal,Nueva York,Atlanta,Miami",
  "Londres;0;713,186;Nueva York,Madrid,Paris,Essen",
  "Madrid;0;700,234;Nueva York,Londres,Paris,Sao Paulo,Argel",
  "Paris;0;741,202;Madrid,Londres,Essen,Argel,Milan",
  "Essen;0;769,153;Londres,Paris,San Petersburgo,Milan",
  "Milan;0;769,190;Essen,Paris,Estambul",
  "San Petersburgo;0;830,169;Essen,Estambul,Moscu",
  "Los Angeles;3;280,286;San Francisco,Mexico DF,Chicago,Sidney",
  "Miami;3;387,290;Washington,Atlanta,Mexico DF,Bogota",
  "Mexico DF;3;306,311;Los Angeles,Miami,Chicago,Bogota,Lima",
  "Bogota;3;408,371;Miami,Mexico DF,Lima,Sao Paulo,Buenos Aires",
  "Lima;3;402,420;Mexico DF,Bogota,Santiago de Chile",
  "Santiago de Chile;3;438,500;Lima",
  "Buenos Aires;3;462,541;Sao Paulo,Bogota",
  "Sao Paulo;3;530,460;Bogota,Buenos Aires,Lagos,Madrid",
  "Lagos;3;723,363;Sao Paulo,Kinsasa,Jartum",
  "Kinsasa;3;785,436;Lagos,Jartum,Johannesburgo",
  "Jartum;3;830,363;El Cairo,Lagos,Kinsasa,Johannesburgo",
  "Johannesburgo;3;830,508;Kinsasa,Jartum",
  "Argel;2;744,266;Madrid,Paris,Estambul,El Cairo",
  "El Cairo;2;836,282;Argel,Estambul,Bagdad",
  "Riad;2;912,311;El Cairo,Bagdad,Karachi",
  "Estambul;2;846,237;Argel,El Cairo,Bagdad,Moscu",
  "Bagdad;2;897,258;Estambul,Karachi,Riad,El Cairo",
  "Moscu;2;907,186;Teheran,Estambul,San Petersburgo",
  "Teheran;2;937,250;Moscu,Bagdad,Karachi,Nueva Delhi",
  "Karachi;2;999,286;Teheran,Bagdad,Nueva Delhi,Riad,Bombay",
  "Bombay;2;1024,319;Karachi,Nueva Delhi,Madras",
  "Nueva Delhi;2;1044,266;Teheran,Karachi,Bombay,Madras,Calcuta",
  "Calcuta;2;1090,299;Nueva Delhi,Hong Kong,Madras,Bangkok",
  "Madras;2;1055,331;Bombay,Nueva Delhi,Calcula,Bangkok,Yakarta",
  "Bombay;2;1024,319;Karachi,Madras,Nueva Delhi",
  "Yakarta;1;1172,424;Madras,Bangkok,Ho Chi Minh,Sidney",
  "Bangkok;1;1141,335;Yakarta,Calcuta,Madras,Ho Chi Minh,Hong Kong",
  "Hong Kong;1;1187,299;Bangkok,Ho Chi Minh,Taipei,Manila,Shanghai",
  "Shanghai;1;1218,286;Pekin,Hong Kong,Seul,Tokio,Taipei",
  "Pekin;1;1197,242;Seul,Shanghai",
  "Seul;1;1248,240;Pekin,Tokio",
  "Tokio;1;1304,234;San Francisco,Seul,Osaka,Shanghai",
  "Osaka;1;1279,258;Tokio,Taipei",
  "Taipei;1;1228,303;Osaka,Shanghai,Hong Kong,Manila",
  "Ho Chi Minh;1;1170,346;Yakarta,Bangkok,Hong Kong,Manila",
  "Manila;1;1223,339;San Francisco,Ho Chi Minh,Taipei,Hong Kong,Sidney",
  "Sidney;1;1345,520;Los Angeles,Manila,Yakarta",
    ]


  
    puntos: { ciudad: string; x: number; y: number }[] = [];
  
    ngOnInit() {
      const mapaOriginalWidth = 1288; 
      const mapaOriginalHeight = 575; 
    
      for (let i = 0; i < this.dataStrings.length; i++) {
        const line = this.dataStrings[i];
        const partes = line.split(';');
        const ciudad = partes[0];
        const [x, y] = partes[2].split(',').map(Number);
  
        const xPercent = (x / mapaOriginalWidth) * 100;
        const yPercent = (y / mapaOriginalHeight) * 100;
    
        this.puntos.push({ ciudad, x: xPercent, y: yPercent });
      }
    }
    

    onPuntoClick(ciudad: string) {
      console.log(`Has hecho clic en: ${ciudad}`); // Las movidas de cada ciudad aqui
    }
}
