// src/app/service/vehicle.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // 💡 Importação necessária para o operador map

// ======================================================================
// DEFINIÇÃO DAS INTERFACES DE DADOS
// ======================================================================

// 1. O que é retornado na lista de modelos para o Dropdown
export interface ModelSummary {
  model: string;
}

// 2. O que é retornado para os Cards e Imagem (GET /vehicle/:model)
export interface ModelData {
  model: string;
  totalSales: number;
  connected: number;
  updated: number;
  image: string; // Agora armazena a URL completa
}

// 3. O que é retornado para a Tabela (POST /vehicleData)
export interface VehicleDetail {
  code: string;
  odometer: number;
  status: string;
  lat: number;
  long: number;
}
// 4. Interface para o retorno completo do GET /vehicles
export interface VehicleListResponse {
  vehicles: {
    id: number;
    vehicle: string;
    volumetotal: number;
    connected: number;
    softwareUpdates: number;
    img: string;
    model_name: string;
  }[];
}

// ======================================================================


@Injectable({ providedIn: 'root' })
export class VehicleService {
  private apiBase = 'http://localhost:3001';
  private apiVehicle = `${this.apiBase}/vehicle`;
  private apiVehicles = `${this.apiBase}/vehicles`; 
  private apiVehicleData = `${this.apiBase}/vehicleData`; 

  constructor(private http: HttpClient) {}

  // Busca a lista completa de veículos. O tipo de retorno é VehicleListResponse
  getModels(): Observable<VehicleListResponse> {
    return this.http.get<VehicleListResponse>(this.apiVehicles);
  }

  // Busca os dados agregados para os cards de um modelo específico (GET)
  getVehicleData(model: string): Observable<ModelData> {
    return this.http.get<ModelData>(`${this.apiVehicle}/${model}`).pipe(
      // 💡 CORREÇÃO: Usando 'map' para garantir que a URL da imagem seja absoluta.
      map(data => {
        if (data && data.image && !data.image.startsWith('http')) {
          return {
            ...data,
            // Concatena a URL base da API com o caminho relativo da imagem
            image: this.apiBase + data.image
          };
        }
        return data;
      })
    );
  }

  // Busca o detalhe de um veículo pelo código VIN (POST)
  searchVehicle(code: string): Observable<VehicleDetail | null> {
    return this.http.post<VehicleDetail | null>(this.apiVehicleData, { vin: code });
  }

  // Método de Login
  login(user: string, pass: string): Observable<any> {
    return this.http.post<any>(`${this.apiBase}/login`, { nome: user, senha: pass });
  }
}