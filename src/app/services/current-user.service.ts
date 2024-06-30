import { Injectable } from '@angular/core';
import { CurrentUser } from './current-user';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private localStoragekey: string = 'username';
  private defaultUser: string = 'LocalUser@12345#+*%';

  constructor(private userService: UsersService) {}

  currentUser: CurrentUser = {
    username: this.defaultUser,
    group: [],
    filesID: [],
  };

  getAllUsernames(): string[] {
    return this.userService.getAllUsernames();
  }

  isLoggedIn: boolean = false;

  notLoggedIn(): void {
    this.currentUser = {
      username: this.defaultUser,
      group: [],
      filesID: [],
    };
  }

  logout(): void {
    localStorage.setItem(this.localStoragekey, this.defaultUser);
    this.notLoggedIn();
    this.isLoggedIn = false;
  }

  userLogin(username: string): void {
    if (username == this.defaultUser) {
      this.currentUser.username = username;
      this.currentUser.group = [];
      this.isLoggedIn = false;
    } else {
      this.currentUser.username = username;
      //add function to add groups to current user
      //add function to add filesId to current user
      this.isLoggedIn = true;
      localStorage.setItem(this.localStoragekey, username);
    }

    console.log(
      this.currentUser.username +
        ' has logged in with groups: ' +
        this.currentUser.group +
        '  ,user logged in: ' +
        this.isLoggedIn
    );
  }
}
