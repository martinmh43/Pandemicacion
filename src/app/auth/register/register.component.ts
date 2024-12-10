import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  
  routacion(name: string) {
    this.router.navigate([`/${name}`]);
  }

  constructor(private auth:AuthService, private router: Router) { }

  miFormulario = new FormGroup({
    nombre: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new  FormControl('',[Validators.required, Validators.email]),
    mensaje: new  FormControl('',[Validators.required])
  });

  enviar(){

    if(this.miFormulario.valid){

      const usuario: Usuario = {
        nombre: this.miFormulario.value.nombre,
        email: this.miFormulario.value.email,
        password: undefined
      }

      this.auth.register(usuario).subscribe(
        response => {
          console.log("Usuario registrado")
        }
      );
    }else{
      console.log("Algun dato incorrecto")
    }

  }
}
