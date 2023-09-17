import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, IUser } from '../../../../core/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-confirmation',
  templateUrl: './code-confirmation.component.html',
  styleUrls: ['./code-confirmation.component.sass']
})
export class CodeConfirmationComponent {
  
  confirmationForm!: FormGroup;
  user: IUser; 
  resendButton: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService,
    private snackBar: MatSnackBar, private router: Router) {
    this.user = {} as IUser
  }

  ngOnInit(): void {
    this.confirmationForm = this.fb.group({
      confirmationCode: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onConfirm() {
    if (this.confirmationForm.valid && this.confirmationForm) {
      this.user.email = this.confirmationForm.get('email')?.value;
      this.user.code = this.confirmationForm.get('confirmationCode')?.value;

      this.authService.confirmSignUp(this.user).then((response:any) =>{
        this.snackBar.open(response, 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/login'])
      }).catch((error) => {
        this.snackBar.open(error, 'Close', {
          duration: 5000,
        });
        this.resendButton = true;
      })
    }
  }

  resentCode(){
    this.authService.resentCode(this.user).then(() => {
      this.snackBar.open("The code has been resent", 'Close', {
        duration: 5000,
      })
    }).catch((error) => {
      this.snackBar.open(error, 'Close', {
        duration: 5000,
      })
    })
  }

}
