import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatTable, MatTableDataSource } from '@angular/material/table';;
import { MatPaginator } from '@angular/material/paginator';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonHttpService } from 'src/app/service/common-http.service';
import { User } from '../model/user.model';
import { ChangeDetectionStrategy } from '@angular/compiler';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild('table') table!: MatTable<any>;

  sortedData = new MatTableDataSource<any>;

  userData: User[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'salary', 'actions'];
  dataSource: any;
  typeSelected: string;
  order: boolean = false;
  filterValues: any = {};
  isSalary: boolean = false
  public filterPredicate: any;

  constructor(private _commonService: CommonHttpService, private _toastr: ToastrService, private spinnerService: NgxSpinnerService, private cdr: ChangeDetectorRef) {
    this.userData = [];
    // type of loader
    this.typeSelected = 'ball-fussion'
  }

  ngOnInit(): void {
    this.getUserData();
    this.sortedData.sort = this.sort;

    // this.dataSource.filterPredicate = ((data: User, filter: string): boolean => {
    //   const filterValues = JSON.parse(filter);
    //   console.log("trim", data.salary.trim().toLowerCase());
    //   // return data.salary.indexOf(filter)!=-1;
    //   return (this.isSalary ? data.salary.trim().toLowerCase() === filterValues.salary : true);
    // })
  }

  /**
   * @onDelete delete record of observable type
   * @param id 
   */
  public onDelete(id: number) {
    this._commonService.deleteData(id).subscribe((result) => {
      this._toastr.success('Success!', "Data Successfully deleted.")
      this.getUserData()
    })
  }

  /**
   * @onEdit edit record as per id 
   * @param id 
   */
  public onEdit(id: number) {
    this._commonService.getById(id);
  }

  /**
   * @getUserData get user data from the server
   */
  public getUserData() {
    this.spinnerService.show();
    setTimeout(() => {
      this._commonService.getData().subscribe((result) => {
        this.userData = result;
        this.spinnerService.hide();
      })
    }, 1000);

    this._commonService.getData().subscribe((result) => {
      this.userData = result;
      this.dataSource = new MatTableDataSource(this.userData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  /**
   * @sortData sorting data in asc & desc order
   */
  sortData() {
    if (!this.order) {
      let newarr = this.userData.sort((a, b) => a.id - b.id);
      this.dataSource = newarr
      console.log(this.dataSource, newarr);

    }
    else {
      let newarr = this.userData.sort((a, b) => b.id - a.id);
      this.dataSource = newarr
    }
    this.order = !this.order;
  }

  /**
   * @filterChange filter record
   * @param event 
   */
  filterChange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  applyFilter(column: string, filterValue: string) {
    this.filterValues[column] = filterValue;
    console.log(filterValue);

    this.dataSource.filter = JSON.stringify(this.filterValues);
    console.log(this.dataSource.filter);

  }

  /**
   * @dropTable drag and drop
   * @param event 
   */
  dropTable(event: CdkDragDrop<string[]>) {
    debugger
    if (event.previousContainer === event.container) {
      moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    console.log("findIndex", this.userData.findIndex((d: User) => d === event.item.data));

    // const prevIndex = this.dataSource.data.findIndex((d: any) => d === event.item.data);

    console.log("2nd", event.previousIndex);
    console.log("3rd", event.currentIndex);
    console.log("this.dataSource", this.userData);

    // this.cdr.detectChanges();
    // this.dataSource.data = this.dataSource.data.slice();
    // this.table.renderRows();
  }
}

  // public sortData(sort: any) {

  //   const data = this.userData.slice();

  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }

  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'firstName':
  //         return this.compare(a.firstName, b.firstName, isAsc);

  //       case 'lastName':
  //         return this.compare(a.lastName, b.lastName, isAsc);

  //       default:
  //         return 0;
  //     }
  //   });
  // }

  // compare(a: number | string, b: number | string, isAsc: boolean) {
  //   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  // }

  // sortData() {
  //   let sortFunction = (items: User[], sort: MatSort): User[] => {
  //     if (!sort.active || sort.direction === '') {
  //       return items;
  //     }

  //     return items.sort((a: User, b: User) => {
  //       let comparatorResult = 0;
  //       switch (sort.active) {
  //         case 'firstName':
  //           comparatorResult = a.firstName.localeCompare(b.firstName);
  //           break;
  //         case 'lastName':
  //           comparatorResult = a.lastName.localeCompare(b.lastName);
  //           break;

  //         default:
  //           comparatorResult = a.firstName.localeCompare(b.firstName);
  //           break;
  //       }
  //       return comparatorResult * (sort.direction == 'asc' ? 1 : -1);
  //     });
  //   };

  //   return sortFunction;
  // }

  // ngAfterViewInit() {
  //   this.sortedData.sort = this.sort;
  //   console.log(this.sortedData.sort);

  // }
// }
