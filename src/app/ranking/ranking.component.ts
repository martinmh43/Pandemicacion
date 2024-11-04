import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent {
  constructor(private router: Router) {}

  routacion(name: string) {
    this.router.navigate([`/${name}`]);
  }
}
