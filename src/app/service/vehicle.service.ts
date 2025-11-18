import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private apiVehicle = 'http://localhost:3000/vehicle';
  private apiVehicleData = 'http://localhost:3000/vehicleData';

  constructor(private http: HttpClient) {}

  getModels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiVehicle);
  }

  getVehicleData(model: string): Observable<any> {
    return this.http.get<any>(`${this.apiVehicle}/${model}`);
  }

  searchVehicle(code: string): Observable<any> {
    return this.http.get<any>(`${this.apiVehicleData}/${code}`);
  }
}
