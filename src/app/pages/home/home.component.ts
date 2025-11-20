import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    // coloque seu fluxo real de logout aqui
    localStorage.removeItem('usuarioLogado'); 
    this.router.navigate(['/']);
  }
}
