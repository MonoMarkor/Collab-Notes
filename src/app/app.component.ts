import { Component,OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { HomeComponent } from './home/home.component';
import { ThemeService } from './services/theme.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';
import { CurrentUserService } from './services/current-user.service';
//import { BrowserModule } from '@angular/platform-browser';// error when using it with commonmudule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EditorComponent, HomeComponent, RouterModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Collab notes';



  constructor(public themeService: ThemeService, public userService: CurrentUserService) {
    console.log(
      window.matchMedia(
        'check if system is darkmode' + '(prefers-color-scheme: dark)'
      ).matches
    );
    console.log(
      window.matchMedia(
        'check if system is darkmode' + '(prefers-color-scheme: light)'
      ).matches
    );
  }

  /*currentMode = {
    lightmode: false,
    darkmode: true,
  };*/

  ngOnInit(): void {
    if (!localStorage.getItem('lightMode')) {
      // Initialize theme based on system preference
      this.themeService.setThemeBasedOnSystemPreference();
      console.log('component match');
    }
    if(localStorage.getItem('username')){
      const username = localStorage.getItem('username');
      if(username){
        this.userService.userLogin(username);
      }
    }
  
  }
}
