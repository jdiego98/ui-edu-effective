import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, IUser } from '../../../../core/services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.sass']
})
export class RegisterFormComponent {

  // isConfirm: boolean;
  user: IUser; 

  registerForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthenticationService, private snackBar: MatSnackBar) {
    // this.isConfirm = false;
    this.user = {} as IUser
   }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  public signUp(): void {
    this.authService.signUp(this.user).then((res) => {
      this.snackBar.open(`Please check your email! We've sent you a code to verify your account.`, 'Close', {
        duration: 5000
      });
      this.router.navigate(['/confirmation'])
    }).catch((error) => {
      this.snackBar.open(error, 'Close', {
        duration: 5000,
      });
    })
  }


  checkPasswords(group: FormGroup) {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');
    
    if (passwordControl && confirmPasswordControl) {
        const password = passwordControl.value;
        const confirmPassword = confirmPasswordControl.value;
        
        return password === confirmPassword ? null : { notSame: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid && this.registerForm) {
      this.user.email = this.registerForm.get('email')?.value;
      this.user.password = this.registerForm.get('password')?.value;
      this.user.name =  this.registerForm.get('name')?.value;
      this.user.lastname = this.registerForm.get('lastname')?.value;
      this.user.birthdate = this.registerForm.get('birthdate')?.value;

      this.signUp()
    }else{
      this.snackBar.open("There is an error in the form", 'Close', {
        duration: 5000
      });
    }
  }

}
