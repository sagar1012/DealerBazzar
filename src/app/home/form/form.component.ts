import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonHttpService } from 'src/app/service/common-http.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public userForm: FormGroup<any>;
  show: boolean;
  password: string;
  isSubmitted: boolean;
  typeSelected : string ;


  constructor(private fb: FormBuilder, private _commonService: CommonHttpService, private route: Router, private _toastr : ToastrService,private spinnerService: NgxSpinnerService) {
    this.userForm = this.buildForm();
    this.show = false;
    this.password = 'password';
    this.isSubmitted = false;
    this.typeSelected = 'ball-fussion';
  }

  ngOnInit(): void {
    this._commonService.userData$.subscribe((result) => {
      this.userForm.patchValue(result);
    })
  }

  buildForm() {
    return this.fb.group({
      id: [],
      firstName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2), Validators.pattern(/^[a-zA-Z ]*$/)]],
      lastName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2), Validators.pattern(/^[a-zA-Z ]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]{10}")]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
      confirmPassword: ['', Validators.required,]
    }, { validators: this.checkPasswords })
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  showPassword() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  get userFormControl() {
    return this.userForm.controls;
  }


  public addUserForm() {
    if (!this.userForm.valid) {
      this.isSubmitted = true;
      return;
    }    
    this.spinnerService.show();
    var formData = this.userForm.value;
    delete formData['confirmPassword'];
    if (formData.id) {
      this._commonService.updateData(this.userForm.value).subscribe((result) => {
        this._toastr.success('Success!', "Data Successfully added.");
        this.spinnerService.hide();
        this.route.navigateByUrl('/custom-list');
      })
     
    }
    else {
      this._commonService.addData(this.userForm.value).subscribe((result) => {
        this._toastr.success('Success!', "Data Successfully added.");
        this.spinnerService.hide();
        this.route.navigateByUrl('/custom-list')
      })
    }
  }

  }


