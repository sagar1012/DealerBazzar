import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: User[], args: string): User[] {


    return value.filter((val) => {
      let rVal = (val.firstName.toLocaleLowerCase().includes(args)) ||
        (val.lastName.toLocaleLowerCase().includes(args)) ||
        (val.email.toString().includes(args)) ||
        (val.mobileNumber.toLocaleLowerCase().includes(args));
      return rVal;
    });

  }
}


