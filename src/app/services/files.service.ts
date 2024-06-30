import { Injectable } from '@angular/core';
import { Files } from './files';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor() {
    // Load files from localStorage if already saved
    const storedFiles = localStorage.getItem(this.localStorageKey);
    if (storedFiles) {
      this.localFiles = JSON.parse(storedFiles);
    }
  }

  files: Files[] = [
    {
      serverid: '123',
      fileTitle: 'Getting Started',
      fileBody: 'Press Download Button to download text',
      updatedAt: new Date('2024-01-16'),
    },
    {
      serverid: '246',
      fileTitle: 'To do',
      fileBody: 'Learn asynchronous programming with Angular',
      updatedAt: new Date('2024-02-16'),
    },
    {
      serverid: '346',
      fileTitle: 'Socket.IO',
      fileBody: 'Websockets with Socket.IO',
      updatedAt: new Date('2024-03-16'),
    },
    {
      serverid: '346',
      fileTitle: 'Node.Js',
      fileBody: 'Backend....',
      updatedAt: new Date('2024-04-16'),
    },
    {
      serverid: '546',
      fileTitle: 'Github',
      fileBody: 'As a version Control System',
      updatedAt: new Date('2024-05-16'),
    },
    {
      serverid: '646',
      fileTitle: 'Services',
      fileBody: 'Angular services',
      updatedAt: new Date('2024-02-18'),
    },
  ];

  getAllFiles(): Files[] {
    return this.files;
  }
  getsServerFilesById(id: string): Files | undefined {
    return this.files.find((files) => files.serverid === id);
  }
  pushFile(file: Files): void {
    this.files.push(file);
  }
  updateFile(updatedFile: Files): void {
    const fileIndex = this.files.findIndex(
      (file) => file.serverid === updatedFile.serverid
    );
    if (fileIndex !== -1) {
      this.files[fileIndex] = { ...updatedFile };
      console.log(`File with ID ${updatedFile.serverid} updated successfully.`);
    }
  }
  generateId(): number {
    return (Math.random() * 100) % 1;
  }
  checkIdIfPresent(id: string): boolean {
    return this.files.some((file) => file.serverid === id);
  }
  deleteFileById(id: string): void {
    const fileIndex = this.files.findIndex((file) => file.serverid === id);
    if (fileIndex !== -1) {
      this.files.splice(fileIndex, 1);
      console.log(`File with ID ${id} deleted successfully.`);
    } else {
      console.log(`File with ID ${id} not found.`);
    }
  }

  //localfiles implementation---------------------------------------------------------------

  private localStorageKey = 'files';
  localFiles: Files[] = [];
  userlocalFiles: Files[] = [];

  // Function to save files array to localStorage
  saveFilesToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.files));
  }
  pushLocalFile(file: Files): void {
    this.localFiles.push(file);
  }
  pushUserLocalFile(file: Files): void {
    this.userlocalFiles.push(file);
  }
  //needs better 
  getuserlocalfiles(local_ids:string[]):void{
    for (let i = 0; i < local_ids.length; i++) {
      //console.log(local_ids[i]);
      if( this.localFiles.some((file) => file.serverid === local_ids[i])){
        this.userlocalFiles.push(this.getslocalFileById(local_ids[i])!);
      }
    }
  }

  getslocalFileById(id: string): Files | undefined {
    return this.localFiles.find((files) => files.serverid === id);
  }
  getsUserlocalFileById(id: string): Files | undefined {
    return this.userlocalFiles.find((files) => files.serverid === id);
  }
}
