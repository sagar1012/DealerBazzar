import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonHttpService } from 'src/app/service/common-http.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { User } from '../model/user.model';

@Component({
  selector: 'app-custom-list',
  templateUrl: './custom-list.component.html',
  styleUrls: ['./custom-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomListComponent implements OnInit, AfterContentChecked {

  userData: User[];
  userListData: User[];
  tempUserData: User[];
  typeSelected: string;
  order: boolean = false;

  searchRecord: string = '';

  // sorting
  isDesc: boolean = false;
  column: string = '';
  categoris!: ['firstName'];

  constructor(private _commonService: CommonHttpService, private _toastr: ToastrService, private spinnerService: NgxSpinnerService, private cdr: ChangeDetectorRef) {
    this.userData = [];
    this.userListData = [];
    this.tempUserData = [];
    this.typeSelected = 'ball-fussion';
    this.searchRecord = '';
  }

  ngOnInit(): void {
    this.getUserData();
  }

  /**
 * @getUserData get user data from the server
 */
  public getUserData() {
    this.spinnerService.show();
    setTimeout(() => {
      this._commonService.getData().subscribe((result:any) => {
        this.userData = result;
        this.spinnerService.hide();
      })
    }, 1000);

    this._commonService.getData().subscribe((result:any) => {
      this.userData = result;
    })
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
   * @changePage pagination
   * @param userList 
   */
  changePage(userList: any) {
    // this.userData = userList;
    // this.cdr.detectChanges();
    this.tempUserData = this.userData.slice(userList.startIndex, userList.endIndex + 1);
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  /**
   * 
   * @param event 
   */
  onChange(event: any) {
    
    console.log("check123 : ",event.target.checked);

    if(event.target.checked){
      this.tempUserData = this.userData.filter((res: User) => {
        res.id == event.target.value
        // console.log(this.tempUserData);
      })
      for(let i=0; i<= this.tempUserData.length; i++){
        // var firstArray = this.tempUserData[i];
        // console.log("firstarray",firstArray);
        
      }
      
    }
  }

  /**
  * @filterChange filter salary
  * @param event 
  */
  filterData(data: any) {

    this.userListData = [...this.userData];

    let selected = data.target.value;

    this.userListData = this.userData.filter((data) => {
      switch (selected) {

        case 1:
          console.log("selected", selected);

          if (+data.salary >= 10000 && +data.salary <= 30000) {
            console.log(this.tempUserData);
            this.userListData = this.userData;
          }
          break;

        case 2:
          console.log("selected", selected);
          if (+data.salary >= 40000 && +data.salary <= 60000) {
            console.log(this.userData);
            this.userData = this.userListData;
          }
          break;

        case 3:
          console.log("selected", selected);

          if (+data.salary >= 70000 && +data.salary <= 100000) {
            console.log(this.userData);
            this.userData = this.userListData
          }
          break;
      }
    })
    return this.userListData;
  }

  /**
  * @sortData sorting data in asc & desc order
  */
  sort(property: string) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;

    let direction = this.isDesc ? 1 : -1;

    let newArray = this.userData.sort(function (a, b) {

      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
    console.log("newArray", newArray);
    return newArray;
  }

  sortData() {
    if (this.order) {
      let newarr = this.userData.sort((a, b) => a.id - b.id);
      this.userData = newarr;
    }
    else {
      let newarr = this.userData.sort((a, b) => b.id - a.id);
      this.userData = newarr
    }
    this.order = !this.order;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.userData, event.previousIndex, event.currentIndex);
    this.userData.forEach((user, index) => {
      user.id = index + 1;
    })
  }

  // sortName(property: any) {
  //   this.order = !this.order;
  //   let direction = this.order ? 1 : -1;

  //   console.log(direction, this.userData);

  //   this.userData.sort(function (a, b) {

  //     if (a[property] < b[property]) {
  //       return -1 * direction;
  //     }
  //     else if (a[property] > b[property]) {
  //       return 1 * direction;
  //     }
  //     else {
  //       return 0;
  //     }
  //   });
  // }
}



// this.userData = this.userListData

// const keys: string[] = Object.keys(data);
// keys.forEach((key: any) => {
//   if(data[key]) {
//     this.userListData = this.userListData.filter((res: any) => {
//       console.log("hii",res[key]);
//       return res[key].toString().toLowerCase() === data[key].toString().toLowerCase();
//     })
//   }
// })