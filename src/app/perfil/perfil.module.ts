import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { PerfilUserComponent } from './perfil-user/perfil-user.component';

@NgModule({
  declarations: [PerfilUserComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [PerfilUserComponent]
})
export class PerfilModule { }
