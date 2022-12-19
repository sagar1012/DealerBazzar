import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonHttpService } from 'src/app/service/common-http.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-material-list-container',
  templateUrl: './material-list-container.component.html',
  styleUrls: ['./material-list-container.component.scss']
})
export class MaterialListContainerComponent implements OnInit {
  
  userData:User[];
  typeSelected : string ;
  constructor(private _commonService: CommonHttpService,private router:Router, private _toastr: ToastrService, private spinnerService: NgxSpinnerService) {
    this.userData = [];
    this.typeSelected = 'ball-fussion';

   }

  ngOnInit(): void {
    this.getUserData();
  }

  public getUserData(){
    this.spinnerService.show();
    setTimeout(() => {
      this._commonService.getData().subscribe((result) => {
        this.userData = result;  
        this.spinnerService.hide();   
      })
    }, 1000);
  }
  
  public delete(id:number){
    this.spinnerService.show();
    this._commonService.deleteData(id).subscribe((result) => {
      this.spinnerService.hide();   
    })
  }

  public edit(id: number){
    this._commonService.getById(id);
  }
}
