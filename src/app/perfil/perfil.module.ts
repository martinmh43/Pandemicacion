import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilUserComponent } from './perfil-user/perfil-user.component';

@NgModule({
  declarations: [PerfilUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class PerfilModule { }
