import { Injectable } from '@angular/core';
import { Files } from './files';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor() {}

  files: Files[] = [
    {
      id: 123,
      fileTitle: 'Getting Started',
      fileBody: 'Press Download Button to download text',
      updatedAt: new Date('2024-01-16'),
      shared: false,
    },
    {
      id: 246,
      fileTitle: 'To do',
      fileBody: 'Learn asynchronous programming with Angular',
      updatedAt: new Date('2024-02-16'),
      shared: false,
    },
    {
      id: 346,
      fileTitle: 'Socket.IO',
      fileBody: 'Websockets with Socket.IO',
      updatedAt: new Date('2024-03-16'),
      shared: false,
    },
    {
      id: 446,
      fileTitle: 'Node.Js',
      fileBody: 'Backend....',
      updatedAt: new Date('2024-04-16'),
      shared: false,
    },
    {
      id: 546,
      fileTitle: 'Github',
      fileBody: 'As a version Control System',
      updatedAt: new Date('2024-05-16'),
      shared: false,
    },
    {
      id: 646,
      fileTitle: 'Services',
      fileBody: 'Angular services',
      updatedAt: new Date('2024-02-18'),
      shared: false,
    },
  ];

  getAllFiles(): Files[] {
    return this.files;
  }
  getFilesById(id: number): Files | undefined {
    return this.files.find((files) => files.id === id);
  }
  pushFile(file: Files): void {
    this.files.push(file);
  }
  updateFile(updatedFile: Files): void {
    const fileIndex = this.files.findIndex(
      (file) => file.id === updatedFile.id
    );
    if (fileIndex !== -1) {
      this.files[fileIndex] = { ...updatedFile };
      console.log(`File with ID ${updatedFile.id} updated successfully.`);
    }
  }
  generateId(): number {
    return (Math.random() * 100) % 1;
  }
  checkIdIfPresent(id: number): boolean {
    return this.files.some((file) => file.id === id);
  }
  deleteFileById(id: number): void {
    const fileIndex = this.files.findIndex((file) => file.id === id);
    if (fileIndex !== -1) {
      this.files.splice(fileIndex, 1);
      console.log(`File with ID ${id} deleted successfully.`);
    } else {
      console.log(`File with ID ${id} not found.`);
    }
  }
}
