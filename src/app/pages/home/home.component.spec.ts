// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importar Router para navegação

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html', // Usaremos o template anterior
  styleUrls: ['./home.component.scss']  // Usaremos o estilo anterior
})
export class HomeComponent {
goToDashboard() {
throw new Error('Method not implemented.');
}
  
  // Injeta o serviço Router para realizar a navegação
  constructor(private router: Router) {}

  /**
   * Navega para a rota 'dashboard'.
   * Observação: Descomente a rota 'dashboard' no seu arquivo 'routes.ts'
   * para que esta função funcione corretamente.
   */
  goToDashboard(): void {
    console.log('Navegando para o Dashboard...');
    this.router.navigate(['/dashboard']);
    // Alert usado apenas para demonstração, remova em produção
    // alert('Ação: Navegando para o Dashboard'); 
  }

  /**
   * Simula a ação de Logout e navega para a rota de login ('/').
   */
  logout(): void {
    console.log('Realizando Logout e navegando para Login...');
    // Aqui você adicionaria a lógica real de logout (limpar tokens, etc.)
    this.router.navigate(['/']); 
    // Alert usado apenas para demonstração, remova em produção
    // alert('Ação: Logout realizado');
  }
}