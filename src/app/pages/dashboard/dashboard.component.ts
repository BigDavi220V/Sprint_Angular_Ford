// src/app/pages/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  VehicleService, 
  ModelSummary, 
  ModelData, 
  VehicleDetail 
} from '../../service/vehicle.service'


@Component({
  selector: 'app-dashboard',
  standalone: true,
  // 💡 IMPORTS ESSENCIAIS: FormsModule para [(ngModel)] e CommonModule para *ngFor, *ngIf.
  imports: [FormsModule, CommonModule], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Propriedades tipadas corretamente
  models: ModelSummary[] = [];
  selectedModel: string = '';
  modelData: ModelData | null = null; 

  searchCodeInput: string = '';
  vehicleDetail: VehicleDetail | null = null; 
  
  // Injeção do Service e Router
  constructor(private api: VehicleService, private router: Router) {}

  ngOnInit() {
    this.loadModels();
  }

  loadModels() {
    this.api.getModels().subscribe({
      next: (res) => {
        // 💡 Lógica correta para o Dropdown: Mapeia o array 'vehicles' do objeto de resposta
        this.models = res.vehicles.map(v => ({ model: v.model_name }));
      },
      error: (err) => {
        console.error("Erro ao carregar modelos:", err);
      }
    });
  }

  // Método chamado quando o modelo no dropdown muda
  changeModel() {
    this.vehicleDetail = null; 
    this.searchCodeInput = '';

    if (!this.selectedModel) {
      this.modelData = null; 
      return;
    }

    this.api.getVehicleData(this.selectedModel).subscribe({
      next: (res) => {
         // O service já corrigiu o caminho da imagem
        this.modelData = res;
      },
       error: (err) => {
        console.error(`Erro ao carregar dados do modelo ${this.selectedModel}:`, err);
        this.modelData = null;
      }
    });
  }

  // Método chamado ao clicar em "Buscar" VIN
  searchCode() {
    this.vehicleDetail = null; 

    if (!this.searchCodeInput.trim()) return;

    this.api.searchVehicle(this.searchCodeInput).subscribe({
      next: (res) => {
        this.vehicleDetail = res;
      },
      error: (err) => {
        console.error("Erro ao buscar VIN:", err);
        this.vehicleDetail = null;
      }
    });
  }
  
  // Método de Logout implementado
  Logout(): void{
    localStorage.removeItem('usuarioLogado'); 
    this.router.navigate(['/']);
  }
}