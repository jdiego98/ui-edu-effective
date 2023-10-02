import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/enviroments/environment';

export interface IUser {
  email: string;
  password: string;
  code: string;
  name: string;
  lastname: string;
  birthdate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticationSubject: BehaviorSubject<any>;
  public isAuthenticated$;
  
  constructor() { 
    Amplify.configure({
      Auth: environment.cognito
    });
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
    this.isAuthenticated$ = this.authenticationSubject.asObservable();
  }

  public signUp(user: IUser): Promise<any> {
    let birthdateString = `${user.birthdate.getFullYear()}-${(user.birthdate.getMonth() + 1).toString().padStart(2, '0')}-${user.birthdate.getDate().toString().padStart(2, '0')}`;
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        'custom:name': user.name,
        'custom:lastname': user.lastname,
        'custom:birthdate': birthdateString,
      }
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public resentCode(user: IUser): Promise<any>{
    return Auth.resendSignUp(user.email);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password).then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut().then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public isAuthenticated(): Promise<boolean>{
    if(this.authenticationSubject.value){
      return Promise.resolve(true);
    }else{
      return this.getUser().then((user:any) => {
        if (user) {
          this.authenticationSubject.next(true);
          return true;
        }else {
          return false;
        }
      }).catch(() => {
        return false;
      });
    }    
  }

  public async getToken(): Promise<string | null> {
    try {
      const session = await Auth.currentSession();
      return session.getIdToken().getJwtToken();
    } catch (error) {
      console.error('Error fetching JWT token:', error);
      return null;
    }
  }

  // public async checkTokenValidity(): Promise<boolean> {
  //   try {
  //     const session = await Auth.currentSession();
  //     const token = session.getIdToken().getJwtToken();
  //     const decodedToken: any = this.decodeJWT(token);
  //     const currentTimestamp = Math.floor(new Date().getTime() / 1000);
  
  //     if (currentTimestamp > decodedToken.exp) {
  //       await this.signOut();
  //       return false;
  //     }
  
  //     return true;
  
  //   } catch (error) {
  //     console.error('Error checking token validity:', error);
  //     return false;
  //   }
  // }
  
  // private decodeJWT(token: string): any {
  //   const base64Url = token.split('.')[1];
  //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));
  
  //   return JSON.parse(jsonPayload);
  // }
  

}
