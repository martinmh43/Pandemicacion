import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-user',
  standalone: true,
  imports: [],
  templateUrl: './perfil-user.component.html',
  styleUrl: './perfil-user.component.scss'
})
export class PerfilUserComponent {

  userName: string = '';
  selectedImage: string = '';
  images: string[] = [
    'assets/img/avatar1.png',
    'assets/img/avatar2.png',
    'assets/img/avatar3.png',
  ];

  user = {
    name: '',
    selectedImage: '',
    victories: 0
  };

  selectImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  register(): void {
    if (this.userName && this.selectedImage) {
      this.user.name = this.userName;
      this.user.selectedImage = this.selectedImage;
      this.user.victories = 0;

      console.log('Usuario registrado:', this.user);
      alert('¡Registro exitoso!');
    } else {
      alert('Por favor, ingrese un nombre de usuario y seleccione una imagen.');
    }
  }

}
