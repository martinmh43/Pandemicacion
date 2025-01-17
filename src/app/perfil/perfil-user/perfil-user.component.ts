import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.scss']
})
export class PerfilUserComponent {

  perfilForm: FormGroup;
  imagenes = [
    'images/avatar1.png',
    'images/avatar2.png',
    'images/avatar3.png',
  ];
  imagenSeleccionada: number | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  seleccionarImagen(index: number) {
    this.imagenSeleccionada = index;
  }

  onSubmit() {
    if (this.perfilForm.valid && this.imagenSeleccionada !== null) {
      const nombre = this.perfilForm.value.nombre;
      const imagenSeleccionada = this.imagenes[this.imagenSeleccionada];

      console.log('Nombre:', nombre);
      console.log('Imagen seleccionada:', imagenSeleccionada);
      //Para tener un feedback x consola de q vaya bien
      
    } else {
      console.log('Formulario inválido o no se ha seleccionado una imagen');
    }
  }

  routacion(name: string) {
    this.router.navigate([`/${name}`]);
  }
  
}
