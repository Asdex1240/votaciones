import { Injectable } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class MetmaskService {
  private web3: Web3 | null = null;

  constructor() {}

  // Método para configurar el proveedor de MetaMask
  async setProvider(): Promise<any> {
    try {
      const provider = await detectEthereumProvider();
      if (provider) {
        return provider;
      } else {
        alert("Please install MetaMask to use this application.");
        return null;
      }
    } catch (error) {
      console.error("Error detecting MetaMask provider:", error);
      return null;
    }
  }

  // Método para obtener la instancia de Web3
  async getWeb3(): Promise<Web3 | null> {
    if (this.web3) {
      return this.web3;
    }

    const provider = await this.setProvider();
    if (provider) {
      this.web3 = new Web3(provider as any);
      return this.web3;
    } else {
      return null;
    }
  }

  async getAccount(): Promise<string | null> {
    const web3 = await this.getWeb3();
    if (web3) {
      try {
        const accounts = await web3.eth.requestAccounts();
        return accounts[0];  // Retorna la primera cuenta
      } catch (error) {
        console.error("Error al obtener la cuenta de MetaMask:", error);
        return null;
      }
    } else {
      return null;
    }
  }
}


