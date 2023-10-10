import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent {

  constructor(private authService: AuthenticationService) {
    
  }

  ngOnInit(): void {
    
    // this.authService.getToken().then((res) =>{
    //   console.log(res)
    // })
  }

}
