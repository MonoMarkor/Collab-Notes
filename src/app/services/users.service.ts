import { Injectable } from '@angular/core';
import { User } from './user_model';
import { CurrentUser } from './current-user';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  usersList: User[] = [
    {
      user_id: '1',
      username: 'Angular',
      password: 'Angular',
      local_file_ids: [],
      group_ids: ['A', 'B'],
    },
    {
      user_id: '1',
      username: 'Backend',
      password: 'Backend',
      group_ids: ['A', 'B'],
      local_file_ids: [],
    },
    {
      user_id: '1',
      username: 'Client',
      password: 'Client',
      group_ids: ['A'],
      local_file_ids: [],
    },
    {
      user_id: '1',
      username: 'Dekstop',
      password: 'Dekstop',
      group_ids: ['B'],
      local_file_ids: [],
    },
    {
      user_id: '1',
      username: 'Express',
      password: 'Express',
      group_ids: ['C'],
      local_file_ids: [],
    },
  ];

  checkCredentials(username: string, password: string): boolean {
    const user = this.usersList.find((user) => user.username === username);
    if (user) {
      console.log(user.password === password);
    } else {
      console.log('user not found');
    }
    return user ? user.password === password : false;
  }

  addUser(username: string, password: string): void {
    const newUser: User = {
      username,
      password,
      group_ids: [],
      local_file_ids: [],
      user_id: '45',
    };
    this.usersList.push(newUser);
  }

  isUsernameTaken(username: string): boolean {
    return this.usersList.some((user) => user.username === username);
  }


  //CurrentUser Implementation
  private localStoragekey: string = 'username';
  private defaultUser: string = 'LocalUser@12345#+*%';
   isLoggedIn: boolean = false;

  currentUser: CurrentUser = {
    username: this.defaultUser,
    group_ids: [],
    local_file_ids: [],
  };

  notLoggedIn(): void {
    this.currentUser = {
      username: this.defaultUser,
      group_ids: [],
      local_file_ids: [],
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
      this.currentUser.group_ids = [];
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
        this.currentUser.group_ids +
        '  ,user logged in: ' +
        this.isLoggedIn
    );
  }
}
