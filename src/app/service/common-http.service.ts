import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../home/model/user.model';


@Injectable({
  providedIn: 'root'
})

export class CommonHttpService {

  public api: string;
  private userData : Subject<User>;
  public userData$ : Observable<User>;
  constructor(private http: HttpClient, private _route : Router) {
    this.api = environment.baseUrl;
    this.userData = new Subject();
    this.userData$ = this.userData.asObservable();
  }

  public getData(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/userData`);
  }

  public addData(data: User): Observable<User> {
    return this.http.post<User>(`${this.api}/userData`, data);
  }
  
  public getById(id: number) {
    this.http.get<User>(`${this.api}/userData/${id}`).subscribe((result : User) =>{
      this.userData.next(result);     
    });
    this._route.navigate(['/form']);
    
  }
  
  public updateData(data: User):Observable<User> {
    setTimeout(() => {   
    }, 3000);
    
    return this.http.put<User>(`${this.api}/userData/${data.id}`, data);
  }
 
  public deleteData(id: number):Observable<User> {
    return this.http.delete<User>(`${this.api}/userData/${id}`);
  }

}
