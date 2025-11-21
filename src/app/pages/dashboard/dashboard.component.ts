// src/app/pages/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  VehicleService, 
  ApiVehicle, 
  VehicleDetail 
} from '../../service/vehicle.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Lista simples de strings para o dropdown
  modelNames: string[] = []; 
  
  selectedModel: string = '';
  
  // Dados do Card Principal (Dados do modelo)
  modelData: ApiVehicle | null = null; 

  // Dados da busca por VIN
  searchCodeInput: string = '';
  vehicleDetail: VehicleDetail | null = null; 
  
  constructor(private api: VehicleService, private router: Router) {}

  ngOnInit() {
    this.loadModels();
  }

  loadModels() {
    this.api.getModels().subscribe({
      next: (res) => {
        // A API retorna { vehicles: [...] }. Mapeamos para pegar só os nomes.
        // Propriedade da API é 'vehicle', não 'model_name'
        this.modelNames = res.vehicles.map(v => v.vehicle);
      },
      error: (err) => {
        console.error("Erro ao carregar modelos:", err);
      }
    });
  }

  changeModel() {
    this.vehicleDetail = null; 
    this.searchCodeInput = '';
    this.modelData = null;

    if (!this.selectedModel) return;

    this.api.getVehicleData(this.selectedModel).subscribe({
      next: (data) => {
        if(data) {
          this.modelData = data;
        }
      },
      error: (err) => {
        console.error(`Erro ao carregar dados do modelo ${this.selectedModel}:`, err);
      }
    });
  }

  searchCode() {
    this.vehicleDetail = null; 

    if (!this.searchCodeInput.trim()) return;

    this.api.searchVehicle(this.searchCodeInput).subscribe({
      next: (res) => {
        this.vehicleDetail = res;
      },
      error: (err) => {
        console.error("Erro ao buscar VIN ou VIN não encontrado:", err);
        alert("VIN não encontrado ou erro no servidor");
        this.vehicleDetail = null;
      }
    });
  }
  
  Logout(): void{
    localStorage.removeItem('usuarioLogado'); 
    this.router.navigate(['/login']); // Certifique-se que a rota é '/login'
  }
}