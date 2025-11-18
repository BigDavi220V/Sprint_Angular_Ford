// src/app/service/vehicle.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ======================================================================
// DEFINIÇÃO DAS INTERFACES DE DADOS (Substituindo 'any')
// Estrutura do retorno da API na porta 3001
// ======================================================================

// 1. O que é retornado na chamada this.api.getModels() -> Lista de modelos
export interface ModelSummary {
  model: string;
}

// 2. O que é retornado na chamada this.api.getVehicleData(model) -> Dados dos cards
export interface ModelData {
  model: string;
  totalSales: number;
  connected: number;
  updated: number;
  image: string;
}

// 3. O que é retornado na chamada this.api.searchVehicle(code) -> Detalhes da tabela
export interface VehicleDetail {
  code: string;
  odometer: number;
  status: string;
  lat: number;
  long: number;
}
// ======================================================================


@Injectable({ providedIn: 'root' })
export class VehicleService {
  // Ajustado para a porta 3001
  private apiVehicle = '/localhost:3001/vehicle';
  private apiVehicleData = '/localhost:3001/vehicleData';

  constructor(private http: HttpClient) {}

  // Tipagem corrigida para retornar uma lista de ModelSummary
  getModels(): Observable<ModelSummary[]> {
    return this.http.get<ModelSummary[]>(this.apiVehicle);
  }

  // Tipagem corrigida para retornar ModelData
  getVehicleData(model: string): Observable<ModelData> {
    return this.http.get<ModelData>(`${this.apiVehicle}/${model}`);
  }

  // Tipagem corrigida para retornar VehicleDetail (ou null, se a API retornar 200 com corpo null)
  searchVehicle(code: string): Observable<VehicleDetail | null> {
    return this.http.get<VehicleDetail | null>(`${this.apiVehicleData}/${code}`);
  }
}