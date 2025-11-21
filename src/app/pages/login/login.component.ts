import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importação adicionada
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Usuario {
  nome: string; // Alterado de 'name' para manter consistência se quiser usar no cadastro
  login: string; // O antigo 'email' agora é o login/nome de usuário
  password: string;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule], // Adicionado HttpClientModule
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoginMode = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient // Injeção do HttpClient
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.form = this.fb.group({
      // 'nome' aqui representa o Nome Completo (usado apenas no cadastro visualmente)
      name: [''], 
      // 'login' é o campo que a API espera como 'nome'. 
      // Removi Validators.email pois a API exige o usuário "admin"
      login: ['', [Validators.required]], 
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  getUsuarios(): Usuario[] {
    const dados = localStorage.getItem('usuarios');
    return dados ? JSON.parse(dados) : [];
  }

  salvarUsuarios(lista: Usuario[]): void {
    localStorage.setItem('usuarios', JSON.stringify(lista));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log('Form invalido', this.form.errors);
      return;
    }

    const { name, login, password } = this.form.value;

    if (this.isLoginMode) {
      // LÓGICA DE INTEGRAÇÃO COM A API
      // A API espera: { nome: "admin", senha: "..." }
      const payload = {
        nome: login, // Mapeando o campo do formulário para o que a API espera
        senha: password
      };

      this.http.post<any>('http://localhost:3001/login', payload).subscribe({
        next: (response) => {
          console.log('Login bem sucedido!', response);
          // Salva o retorno da API (id, nome, email)
          localStorage.setItem('usuarioLogado', JSON.stringify(response));
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Erro no login', err);
          // Exibe a mensagem vinda da API ou erro genérico
          const mensagem = err.error?.message || 'Erro ao realizar login.';
          alert(mensagem);
        }
      });

    } else {
      // LÓGICA DE CADASTRO (Mantida no LocalStorage pois a API não tem rota de cadastro)
      const usuarios = this.getUsuarios();
      const usuarioJaExiste = usuarios.some(u => u.login === login);

      if (usuarioJaExiste) {
        alert('Este usuário já está cadastrado!');
        return;
      }

      const novoUsuario: Usuario = { nome: name, login, password };
      usuarios.push(novoUsuario);
      this.salvarUsuarios(usuarios);
      
      alert('Cadastro criado com sucesso! Tente logar agora.');
      this.toggleMode();
      this.form.reset();
    }
  }
}