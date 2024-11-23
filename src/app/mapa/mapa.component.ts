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
export class MapaComponent {

 
}