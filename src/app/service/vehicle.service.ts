import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// ======================================================================
// INTERFACES (Adaptadas ao retorno REAL da sua API)
// ======================================================================

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


export interface VehicleDetail {
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
}


@Injectable({ providedIn: 'root' })
export class VehicleService {
  private apiBase = 'http://localhost:3001';
  

  private apiVehicles = `${this.apiBase}/vehicles`; 
  private apiVehicleData = `${this.apiBase}/vehicleData`; 

  constructor(private http: HttpClient) {}

  
  getModels(): Observable<VehicleListResponse> {
    return this.http.get<VehicleListResponse>(this.apiVehicles);
  }


  getVehicleData(modelName: string): Observable<ApiVehicle | undefined> {
    return this.http.get<VehicleListResponse>(this.apiVehicles).pipe(
      map(response => {
        
        const found = response.vehicles.find(v => v.vehicle === modelName);
        return found;
      })
    );
  }

 
  searchVehicle(code: string): Observable<VehicleDetail> {
    
    return this.http.post<VehicleDetail>(this.apiVehicleData, { vin: code });
  }

  
  login(user: string, pass: string): Observable<any> {
    return this.http.post<any>(`${this.apiBase}/login`, { nome: user, senha: pass });
  }
}