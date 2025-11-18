// src/app/service/vehicle.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  // Ajustado para a porta 3001, conforme definido na sua API
  private apiVehicle = 'http://localhost:3001/vehicle';
  private apiVehicleData = 'http://localhost:3001/vehicleData';

  constructor(private http: HttpClient) {}

  // GET http://localhost:3001/vehicle (Retorna a lista de modelos)
  getModels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiVehicle);
  }

  // GET http://localhost:3001/vehicle/:model (Retorna os dados agregados do modelo)
  getVehicleData(model: string): Observable<any> {
    return this.http.get<any>(`${this.apiVehicle}/${model}`);
  }

  // GET http://localhost:3001/vehicleData/:code (Retorna os detalhes de um veículo específico pelo código VIN)
  searchVehicle(code: string): Observable<any> {
    return this.http.get<any>(`${this.apiVehicleData}/${code}`);
  }
}