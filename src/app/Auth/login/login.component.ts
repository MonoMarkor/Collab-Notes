import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, NG_ASYNC_VALIDATORS, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatOption,
} from '@angular/material/autocomplete';
import { UsersService } from '../../services/users.service';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocomplete,
    MatOption,
    MatAutocompleteModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, AfterViewInit{
  constructor(private router: Router) {}

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  userService = inject(UsersService);
  currentuserService = inject(UsersService);

  loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get username() {
    return this.loginForm.controls.username;
  }
  get password() {
    return this.loginForm.controls.password;
  }

  userLogin() {
    //console.log(`${this.username.value}`);
    if (
      this.userService.checkCredentials(
        this.username.value,
        this.password.value))
    {
      this.currentuserService.userLogin(this.username.value);
      alert('logged in as: ' + this.username.value);
      this.loginForm.reset();
      this.navigateToHome();
    } else {
        alert('login failed as : ' + this.username.value);
      }
  }

  login(): void {
    alert('logged in');
  }
}
