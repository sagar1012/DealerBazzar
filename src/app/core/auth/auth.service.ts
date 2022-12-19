import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() { 
  }

  login(email: string, password: string): Observable<boolean> {
    if (email === 'admin@gmail.com' && password === 'admin') {
      localStorage.setItem('username', email);
      localStorage.setItem('password', password);
      return of(true);
    }
    return of(false);
  }

  public isAuthenticate()
  {
    if (localStorage.getItem('username') && localStorage.getItem('password')) {
        return true;
    }
    return false;
  }
  
  
}
