import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  NG_ASYNC_VALIDATORS,
  FormBuilder,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatOption,
} from '@angular/material/autocomplete';
import { passwordValidator } from '../passwordStrength.directive';
import { userPresent } from '../usercheck.directive';
import { UsersService } from '../../services/users.service';
import { passwordsMatch } from '../passwordMatch.directive';
import { CurrentUserService } from '../../services/current-user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
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
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  userService = inject(UsersService);
  currentuserService = inject(CurrentUserService);

  createForm = new FormGroup(
    {
      username: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, userPresent(this.userService)],
      }),
      password1: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, passwordValidator()],
      }),
      password2: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, passwordValidator()],
      }),
    },
    { validators: passwordsMatch('password1', 'password2') }
  );

  createAccount(): void {
    if(!this.userService.isUsernameTaken(this.username.value)){
      this.userService.addUser(this.username.value,this.password2.value)
      this.currentuserService.userLogin(this.username.value)
    }
    alert('logged in');
  }
  /*get username() {
    return this.createForm.get('username');
  }*/

  get password1() {
    return this.createForm.get('password1');
  }


  get username() {
    return this.createForm.controls.username;
  }
  get password2() {
    return this.createForm.controls.password2;
  }
 
}
