// src/app/service/vehicle.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// ======================================================================
// INTERFACES (Adaptadas ao retorno REAL da sua API)
// ======================================================================

// Interface crua do objeto que vem da API na rota /vehicles
export interface ApiVehicle {
  id: number;
  vehicle: string;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
  img: string;
}

export interface VehicleListResponse {
  vehicles: ApiVehicle[];
}

// Interface para os dados do VIN (Rota /vehicleData)
export interface VehicleDetail {
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
}

// ======================================================================

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private apiBase = 'http://localhost:3001';
  
  // Rotas conforme sua API Node.js
  private apiVehicles = `${this.apiBase}/vehicles`; 
  private apiVehicleData = `${this.apiBase}/vehicleData`; 

  constructor(private http: HttpClient) {}

  // 1. Busca a lista para o Dropdown
  getModels(): Observable<VehicleListResponse> {
    return this.http.get<VehicleListResponse>(this.apiVehicles);
  }

  // 2. Busca dados de um modelo específico
  // OBS: Como sua API não tem rota '/vehicle/:nome', buscamos todos e filtramos aqui.
  getVehicleData(modelName: string): Observable<ApiVehicle | undefined> {
    return this.http.get<VehicleListResponse>(this.apiVehicles).pipe(
      map(response => {
        // Encontra o veículo dentro do array retornado pela API
        const found = response.vehicles.find(v => v.vehicle === modelName);
        return found;
      })
    );
  }

  // 3. Busca o detalhe pelo VIN (POST)
  searchVehicle(code: string): Observable<VehicleDetail> {
    // Sua API espera { "vin": "..." } no corpo da requisição
    return this.http.post<VehicleDetail>(this.apiVehicleData, { vin: code });
  }

  // 4. Login
  login(user: string, pass: string): Observable<any> {
    return this.http.post<any>(`${this.apiBase}/login`, { nome: user, senha: pass });
  }
}