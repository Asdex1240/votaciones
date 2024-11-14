import { Injectable } from '@angular/core';
import { MetmaskService } from '../blockchain/metmask.service';
import Web3 from 'web3';
import contract from '../../contracts/contract.json'
@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private web3: Web3 | null = null;
  private contractAddress = "0x15B734821008eD21d79bb324DDACd88A6D14De01";
  private contract: any;

  constructor(
    private metmaskSvc: MetmaskService
  ) {
  
    this.initializeContract()
  
  }

   private async initializeContract(): Promise<void> {
    try {
      const provider = await this.metmaskSvc.setProvider();
      this.web3 = new Web3(provider);
      this.contract = new this.web3.eth.Contract(contract, this.contractAddress);
    } catch (error) {
      console.error("Error initializing contract:", error);
    }
  }

  async getVotos(): Promise<any> {
    if (!this.contract) await this.initializeContract();
    return await this.contract.methods.obtenerTodosLosVotos().call();
  }

  async getMyVotos(dni: string): Promise<any> {
    if (!this.contract) await this.initializeContract();
    return await this.contract.methods.votosRecibidos(dni).call();
  }

  async haVotado(_dniInvitado: string ): Promise<any>{
    if(!this.contract) await this.initializeContract();
    return await this.contract.methods.comprobarSiHaVotado(_dniInvitado).call();
  }

  async sendVoto(_dniInvitado: string, _dniVotado: string ): Promise<any>{
    const accout = await this.metmaskSvc.getAccount();
    console.log(accout)
    return await this.contract.methods.registrarVoto(_dniInvitado, _dniVotado).send({from: accout});
  }
}
