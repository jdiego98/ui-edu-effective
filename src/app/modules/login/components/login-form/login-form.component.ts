import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, IUser } from '../../../../core/services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent {

  user: IUser; 
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router,  private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.user = {} as IUser;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.user.email = this.loginForm.value.email;
      this.user.password = this.loginForm.value.password;

      this.signIn();
    }
  }

  public signIn(): void {
    this.authService.signIn(this.user).then(() => {
      this.router.navigate(['/'])
    }).catch((error) => {
      let message = error.message || 'An error occurred. Please try again.';
      if (message.includes('NotAuthorizedException')) {
        message = 'Incorrect username or password. Please try again.';
      }
      this.snackBar.open(message, 'Close',{
        duration: 5000
      });
    });
  }

}
