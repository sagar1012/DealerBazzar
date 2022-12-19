export class User{
  [x: string]: any;
    public firstName:string;
    public lastName:string;
    public email:string;
    public salary:string;
    public mobileNumber:string;
    public password:string;
    public id:number;

      constructor(firstName:string,lastName:string,email:string,salary: string, mobileNumber: string,password:string, id:number){
          this.firstName = firstName,
          this.lastName = lastName,
          this.email = email,
          this.salary = salary,
          this.mobileNumber = mobileNumber,
          this.password = password,
          this.id =  id
      }
  }
