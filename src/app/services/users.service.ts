import { Injectable } from '@angular/core';
import { Users } from './users';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  usersList: Users[] = [
    { username: 'Angular', password: 'Angular', group: ['A', 'B'], files: [] },
    { username: 'Backend', password: 'Backend', group: ['A', 'B'], files: [] },
    { username: 'Client', password: 'Client', group: ['A'], files: [] },
    { username: 'Dekstop', password: 'Dekstop', group: ['B'], files: [] },
    { username: 'Express', password: 'Express', group: ['C'], files: [] },
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
    const newUser: Users = { username, password, group: [], files: [] };
    this.usersList.push(newUser);
  }

  isUsernameTaken(username: string): boolean {
    return this.usersList.some((user) => user.username === username);
    /*const isTaken = this.usersList.some(
          (user) => user.username === username
        );
        return of(isTaken);*/
  }

  getAllUsernames(): string[] {
    return this.usersList.map((user) => user.username);
  }

  /* password generater
  generateRandomPassword(): string {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    const allChars = uppercaseChars + lowercaseChars + digits + specialChars;
    const passwordLength = 8;

    let password = '';
    
    // Ensure at least one character of each type is included
    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill the remaining length with random characters from all sets
    for (let i = 4; i < passwordLength; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password to ensure random order
    password = this.shuffleString(password);

    return password;
  }

  private shuffleString(str: string): string {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
  }
  
  */
}
