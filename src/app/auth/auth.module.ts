import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations:  [
     //LoginComponent  
],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule, 
    MatFormFieldModule,
    MatInputModule, 
    ReactiveFormsModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }

