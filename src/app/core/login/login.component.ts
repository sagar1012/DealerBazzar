import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  isSubmitted: boolean;
  password: string;
  show: boolean;
  isValidUser: boolean = false;

  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService) { 
    this.loginForm = this.buildForm();
    this.isSubmitted = false;
    this.password = 'password';
    this.show = false
  }

  ngOnInit(): void {
  }

  buildForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]], 
    })
  }

  get loginFormControl() {
    return this.loginForm.controls;
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

  onSubmit() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((data) => {
        if (data) {
          this.router.navigate(['/home']);  // If valid and route to card
        }
        this.isSubmitted = true;
        this.isValidUser = data; // false show error message
      });
  }
}
