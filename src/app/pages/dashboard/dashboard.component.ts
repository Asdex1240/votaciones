import { Component, OnInit } from '@angular/core';
import { BarComponent } from "../../components/charts/bar/bar.component";

import { UltimosVotosComponent } from "../../components/dashboard/ultimos-votos/ultimos-votos.component";
import { MetmaskService } from '../../services/blockchain/metmask.service';
import { CommonModule } from '@angular/common';

import { UserService } from '../../services/api/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ContractService } from '../../services/contracts/contract.service';
import { Router } from '@angular/router';
import { MasVotadosComponent } from "../../components/mas-votados/mas-votados.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UltimosVotosComponent, CommonModule, ReactiveFormsModule, MasVotadosComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  walletAddress: string | null = null;
  userData: any;
  selectedVote: string = '';

  votosType: {ultimosVotos: string[], votosAcumulados: {nombre: string, count: number}[]} = {ultimosVotos:[], votosAcumulados:[]};
  candidates: any[] = [];
  userHasVoted = false;
  misVotos: number = 0;

  form: FormGroup;

  

  constructor(
    private metmaskSvc: MetmaskService, 
    private fb: FormBuilder,
    private router: Router,
    private contractSvc: ContractService,
    private userSvc: UserService
  ){
    this.form = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  obtenerMisVotos(){
    this.contractSvc.getMyVotos(this.userData.dni)
    .then((res) => {
      console.log(res)
      this.misVotos = res
    })
  }

  obtenerVotos(){
    this.contractSvc.getVotos()
    .then(async(res) => {
      console.log(res)
      this.votosType = await this.votosNameAndCount(res)
      
      
      
      
    })
  }

  haVotado(){
    this.contractSvc.haVotado(this.userData.dni)
    .then((res) => {
      this.userHasVoted = res;
      console.log(res)})
  }

  

  async ngOnInit() {
    
    const data = localStorage.getItem('userData');
    if (data) {
      this.userData = JSON.parse(data); 
      console.log(this.userData)
      this.userSvc.getUsers({event: this.userData.evento})
      .subscribe((res: any) => {
        if(res){
          if(res.status =="Ok"){
            this.candidates = res.data
          }
        }
      })
      this.obtenerVotos();
      this.haVotado();
      this.obtenerMisVotos();
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
    const dni = value.dni
    this.contractSvc.sendVoto(this.userData.dni, dni)
    .then((res) => {
      console.log(res)
      this.obtenerVotos()
      this.haVotado();
      this.obtenerMisVotos();
    })
    
  }

  logout(){
    console.log("HOla")
    localStorage.removeItem('userData');
    this.router.navigateByUrl('auth')
  }

  async votosNameAndCount(votos: any[]): Promise<{ ultimosVotos: string[], votosAcumulados: { nombre: string, count: number }[] }> {
    try {
      // Primero, obtenemos los nombres completos (como en votosName)
      const requests = votos.map(voto => {
        const dni = String(voto.dniVotado);
        return this.userSvc.authUser({ dni }).toPromise().then((res: any) => {
          return { dniVotado: dni, nombreCompleto: `${res.data.name} ${res.data.lastname}` };
        });
      });
  
      // Esperamos a que todas las promesas se resuelvan
      const votosConNombre = await Promise.all(requests);
      console.log('Votos con nombres:', votosConNombre);
  
      // Creamos un mapa para asociar dniVotado con su nombre completo
      const dniToNombreMap: Record<string, string> = {};
      votosConNombre.forEach(voto => {
        dniToNombreMap[voto.dniVotado] = voto.nombreCompleto;
      });
  
      // Contamos los votos acumulados (como en contarVotos)
      const votosCount: Record<string, number> = {};
  
      // Iteramos sobre el arreglo `votos` y contamos las veces que aparece cada `dniVotado`
      votos.forEach((voto) => {
        const dniVotado = voto.dniVotado.toString(); // Convertimos a string para usar como clave
        votosCount[dniVotado] = (votosCount[dniVotado] || 0) + 1;
      });
  
      // Ahora creamos el arreglo de votos acumulados con los nombres y los conteos
      const votosAcumulados = Object.entries(votosCount).map(([dniVotado, count]) => {
        // Usamos el mapa para obtener el nombre correspondiente
        const nombre = dniToNombreMap[dniVotado];
        return { nombre, count };
      });
  
      // Devolvemos el objeto con ambos resultados
      return {
        ultimosVotos: votosConNombre.map(voto => voto.nombreCompleto), // Solo los nombres completos
        votosAcumulados
      };
  
    } catch (error) {
      console.error('Error al obtener los nombres de los votos y contarlos:', error);
      throw error; 
    }
  }
  
  
  

}
