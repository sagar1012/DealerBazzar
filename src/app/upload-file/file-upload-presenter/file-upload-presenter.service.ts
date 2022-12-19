import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Files } from '../model/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadPresenterService {

  private file:Files;
  private fileUpload:Subject<Files>;
  public fileUpload$:Observable<Files>;

  constructor() { 
    this.file={} as Files;
    this.fileUpload=new Subject<Files>();
    this.fileUpload$=new Observable<Files>();
    this.fileUpload$=this.fileUpload.asObservable();
  }

  uploadFile(file:File){
    debugger
    for (let i = 0,len = Object.keys(file).length; i <= len; i++) {

      const files = {} as Files
      let size=Math.round(file.size/1024/1024)
      if(size<=2  && file.type == "image/jpeg"){
        
        this.file.name=file.name;
        this.file.size=size;
        this.file.type=file.type;
        
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(file);
        reader.onload = (event) => {
          this.file.content = event.target?.result as string;
          this.fileUpload.next(this.file);
        }
      }
      else if(file.type != "image/jpeg"){
        alert("Please select proper file")
      }
      else{
        alert("File Size is greater than 2MB");
      }
    }
  }
}
