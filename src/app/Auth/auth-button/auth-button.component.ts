import { Component } from '@angular/core';
import { CurrentUserService } from '../../services/current-user.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [MatButtonModule, CommonModule,RouterModule],
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.css',
})
export class AuthButtonComponent {
  constructor(public cuService: CurrentUserService) {}
}
