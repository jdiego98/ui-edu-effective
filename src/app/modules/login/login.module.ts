import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from '../../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { CodeConfirmationComponent } from './components/code-confirmation/code-confirmation.component';


@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    CodeConfirmationComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class LoginModule { }
