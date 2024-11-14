import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserService } from '../../../services/api/user.service';

@Component({
  selector: 'app-ultimos-votos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ultimos-votos.component.html',
  styleUrl: './ultimos-votos.component.scss'
})
export class UltimosVotosComponent {

  constructor(private userSvc: UserService) {}

  @Input() votos: any[] = [];

}
