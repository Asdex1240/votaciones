import { Component, OnInit } from '@angular/core';
import { BarComponent } from "../../components/charts/bar/bar.component";

import { UltimosVotosComponent } from "../../components/dashboard/ultimos-votos/ultimos-votos.component";
import { MetmaskService } from '../../services/blockchain/metmask.service';
import { CommonModule } from '@angular/common';

import { UserService } from '../../services/api/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BarComponent, UltimosVotosComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  walletAddress: string | null = null;
  userData: any;
  selectedVote: string = '';

  candidates: any[] = [];

  form: FormGroup;

  

  constructor(
    private metmaskSvc: MetmaskService, 
    private fb: FormBuilder,
    private userSvc: UserService
  ){
    this.form = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  

  async ngOnInit() {
    
    const data = localStorage.getItem('userData');
    if (data) {
      this.userData = JSON.parse(data); 
      this.userSvc.getUsers({event: this.userData.evento})
      .subscribe((res: any) => {
        if(res){
          if(res.status =="Ok"){
            this.candidates = res.data
          }
        }
        
      })
    }
    this.walletAddress = await this.metmaskSvc.getAccount();

  }

  submitVote() {
    if (this.selectedVote) {
      console.log(`Has votado por: ${this.selectedVote}`);
      alert(`Has votado por: ${this.selectedVote}`);
    } else {
      alert('Por favor, selecciona a un candidato antes de enviar tu voto.');
    }
  }

  sendForm(){
    const value = this.form.value;
    console.log(value)
  }

}
