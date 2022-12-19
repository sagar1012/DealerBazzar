import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonHttpService } from 'src/app/service/common-http.service';
import { User } from '../../model/user.model';
import { MaterialListPresenterService } from '../material-list-presenter/material-list-presenter.service';

@Component({
  selector: 'app-material-list-presentation',
  templateUrl: './material-list-presentation.component.html',
  styleUrls: ['./material-list-presentation.component.scss']
})
export class MaterialListPresentationComponent implements OnInit {
  
  @Input() public  set userData(value : User[])
  {
    this._userData = value;    
    this.dataSource = value;
  }

  public get userData() : User[]
  {
    return this._userData;
  }

  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  
  private _userData:User[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'actions'];
  dataSource : User[] = [];
  
  constructor() { 
    this._userData = [];
  }

  ngOnInit(): void {
  }

  public onDelete(id:number){
    this.delete.emit(id);
  }

  public onEdit(id:number){
    this.edit.emit(id);
  }
}
