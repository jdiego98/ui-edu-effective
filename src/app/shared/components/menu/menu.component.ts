import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  isLogged$!: Observable<boolean>;

  constructor(private authService: AuthenticationService, private router: Router){}

  ngOnInit(): void {
    this.isLogged$ = this.authService.isAuthenticated$;
  }

  logout(){
    this.authService.signOut().then(()=>{
      this.router.navigate(['/auth/login'])
    }).catch((error) => {
      console.log(error)
    })
  }

}
