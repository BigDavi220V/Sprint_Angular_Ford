import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Você pode injetar serviços de autenticação aqui, se necessário.
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Lógica de inicialização, como buscar dados do usuário.
  }

  /**
   * Passo 5: Incluir um item de logout.
   * Método responsável por deslogar o usuário.
   */
  onLogout(): void {
    // 1. Limpar tokens de autenticação (ex: LocalStorage, SessionStorage).
    // localStorage.removeItem('auth_token'); 

    // 2. Redirecionar o usuário de volta para a tela de Login.
    this.router.navigate(['/login']); 
    
    console.log('Usuário deslogado. Redirecionando para a página de login.');
  }
}