import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario} from '../../models/usuario.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  showPassword: boolean = false;
  showLoginPassword: boolean = false;

  togglePasswordVisibility(type: string): void {
    if (type === 'register') {
      this.showPassword = !this.showPassword;
    } else if (type === 'login') {
      this.showLoginPassword = !this.showLoginPassword;
    }
  }

  routacion(name: string) {
    this.router.navigate([`/${name}`]);
  }

  constructor(private auth:AuthService, private router: Router) { }

  miFormulario = new FormGroup({
    nombre: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    message: new FormControl('',[Validators.required])
  })

  enviar () {
    if (this.miFormulario.valid) {
      const usuario: Usuario = {
        nombre: this.miFormulario.value.nombre,
        password: this.miFormulario.value.password,
        email: this.miFormulario.value.email
      }

      this.auth.register(usuario).subscribe(
        response => {
          console.log(usuario)
          console.log("Registrado manito");
        }
      );
    } else {
      console.log("Datos incorrectos loquin");
    }
  }
}
