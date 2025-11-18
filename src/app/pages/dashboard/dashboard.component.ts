import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  models: any[] = [];
  selectedModel: string = '';
  modelData: any = null;

  searchCodeInput: string = '';
  vehicleDetail: any = null;

  constructor(private api: VehicleService) {}

  ngOnInit() {
    this.loadModels();
  }

  loadModels() {
    this.api.getModels().subscribe(res => {
      this.models = res;
    });
  }

  changeModel() {
    if (!this.selectedModel) return;

    this.api.getVehicleData(this.selectedModel).subscribe(res => {
      this.modelData = res;
    });
  }

  searchCode() {
    if (!this.searchCodeInput.trim()) return;

    this.api.searchVehicle(this.searchCodeInput).subscribe(res => {
      this.vehicleDetail = res;
    });
  }
}
