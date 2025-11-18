// src/app/pages/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Importa o Service, e com ele, as Interfaces definidas no Service
import { 
  VehicleService, 
  ModelSummary, 
  ModelData, 
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

  // Tipagem corrigida
  models: ModelSummary[] = [];
  selectedModel: string = '';
  // Tipagem corrigida. Pode ser null antes do carregamento
  modelData: ModelData | null = null; 

  searchCodeInput: string = '';
  // Tipagem corrigida. Pode ser null antes da busca ou se não encontrar
  vehicleDetail: VehicleDetail | null = null; 

  constructor(private api: VehicleService) {}

  ngOnInit() {
    this.loadModels();
  }

  loadModels() {
    // Tipagem inferida corretamente a partir do Service
    this.api.getModels().subscribe(res => {
      this.models = res;
    });
  }

  changeModel() {
    // Melhoria de UX: limpa a busca de VIN ao mudar o modelo
    this.vehicleDetail = null; 
    this.searchCodeInput = '';

    if (!this.selectedModel) {
      this.modelData = null; // Limpa os cards se "Selecione..." for escolhido
      return;
    }

    // Tipagem inferida corretamente a partir do Service
    this.api.getVehicleData(this.selectedModel).subscribe(res => {
      this.modelData = res;
    });
  }

  searchCode() {
    // Limpa o detalhe do veículo antes de buscar (melhor UX)
    this.vehicleDetail = null; 

    if (!this.searchCodeInput.trim()) return;

    // Tipagem inferida corretamente a partir do Service
    this.api.searchVehicle(this.searchCodeInput).subscribe((res): void => {
      this.vehicleDetail = res;
    });
  }
}