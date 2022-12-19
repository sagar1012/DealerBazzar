import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Files } from '../model/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private apiLink:string;

  constructor(private http:HttpClient) { 
    this.apiLink = environment.baseUrl;
  }

  getFiles():Observable<Files[]>{
    return this.http.get<Files[]>(`${this.apiLink}/files`)
  }

  addFiles(file:Files):Observable<Files>{
    return this.http.post<Files>(`${this.apiLink}/files`,file)
  }
  deleteFiles(id: number) {
    return this.http.delete(`${this.apiLink}/files/${id}`)
  }
}
