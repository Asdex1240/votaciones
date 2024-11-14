import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mas-votados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mas-votados.component.html',
  styleUrl: './mas-votados.component.scss'
})
export class MasVotadosComponent {

  @Input() votos: {nombre: string, count: number}[] = [];

}
