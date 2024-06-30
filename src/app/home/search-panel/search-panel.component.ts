import { Component, inject } from '@angular/core';
import { Files } from '../../services/files';
import { FilesService } from '../../services/files.service';
import { CommonModule } from '@angular/common';
import { HomeFilesComponent } from './home-files/home-files.component';
//import { RouterModule, RouterOutlet } from '@angular/router';
import { SortByDatePipe } from '../home-panel/home-pipes/sort-by-date.pipe';
import { RouterModule } from '@angular/router';
import { CurrentUserService } from '../../services/current-user.service';


@Component({
  selector: 'app-search-panel',
  standalone: true,
  imports: [
    HomeFilesComponent,
    CommonModule,
    SortByDatePipe,
    RouterModule
  ],
  templateUrl: './search-panel.component.html',
  styleUrl: './search-panel.component.css',
})
export class SearchPanelComponent {
  files1: Files[] = [];
  filesservice: FilesService = inject(FilesService);
  filteredFilesList: Files[] = [];

  constructor(currentuser:CurrentUserService) {
    this.files1 = this.filesservice.getAllFiles();
    this.filteredFilesList = this.files1;
    console.log("Username: " + currentuser.currentUser.username)
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredFilesList = this.files1;
    }

    this.filteredFilesList = this.files1.filter((fileslocation) =>
      fileslocation?.fileTitle.toLowerCase().includes(text.toLowerCase())
    );
  }
}
