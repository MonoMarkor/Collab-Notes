import {
  Component,
  inject,
  OnInit,
  Output,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { SlideComponent } from './slide/slide.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FilesService } from '../services/files.service';
import { Files } from '../services/files';
import { OpenComponent } from './slide/open/open.component';
import { ShareComponent } from './slide/share/share.component';
import { InfoComponent } from './slide/info/info.component';
import { switchMap,Observable } from 'rxjs';
import { TreetableComponent } from './treetable/treetable.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    SlideComponent,
    OpenComponent,
    CommonModule,
    ShareComponent,
    InfoComponent,
    TreetableComponent
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent implements OnInit, AfterViewInit, OnChanges {
  route: ActivatedRoute = inject(ActivatedRoute);
  theme = 'darkmode';
  fileservice = inject(FilesService);

  currentFile: Files | undefined;
  
  newFile: Files = {
    serverid: this.generateId(),
    fileTitle: '',
    fileBody: '',
    updatedAt: new Date(),
  };
  headerElement!: HTMLInputElement;
  contentElement!: HTMLTextAreaElement;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    console.log('editor created');
  }

  ngOnInit(): void {
    console.log('ngonit');
    this.route.params.subscribe((params) => {
      if (!params['id']) {
        this.currentFile = this.newFile;
        this.updateContent();
        console.log('newfile');
      } else {
        console.log("routing parameter present!")
        const fileLocationId:string = (params['id']);
        //this.navigateToEditor(fileLocationId);
        this.currentFile = this.fileservice.getsServerFilesById(fileLocationId);
        this.updateContent();
        //this.navigateToEditor(fileLocationId);
      }
    });
    /*  if (params['id'] == null) {
        this.currentFile = this.newFile;
        console.log('newfile');
      } else {
        console.log('param is not null');
        const fileLocationId = Number(params['id']);
        if(this.localfileservice.checkIdIfPresent(fileLocationId)){
          this.localFile = this.localfileservice.getFileById(fileLocationId)
          console.log('found local');
          console.log(this.localFile)
        }
        if(this.fileservice.checkIdIfPresent(fileLocationId)){
          this.currentFile = this.fileservice.getFilesById(fileLocationId);
          console.log('found current');
        }
        if(!this.currentFile && this.localFile){
          this.currentFile=this.localFile;
          this.updateContent();
          this.saveFile();
          console.log('no current');

        }else if(this.currentFile && !this.localFile){
          this.updateContent();
          this.localFile=this.currentFile;
          this.localfileservice.saveFile(this.localFile);
          console.log('no local');
        }else if (this.currentFile && this.localFile){
          if(this.localFile.updatedAt>this.currentFile.updatedAt){
            this.currentFile = this.localFile;
            this.updateContent();
            this.saveFile();
            console.log('localfile is newer');
            console.log(this.currentFile)
          }else{
            console.log('localfile is older');
            this.updateContent();
            this.localFile = this.currentFile;
            this.localfileservice.saveFile(this.localFile);
          }
        }else{
          console.log('no comparision bw local and current');
        }*/
    console.log('ng onint:');
    console.log(this.currentFile);
  }

  ngAfterViewInit(): void {
    this.headerElement = document.getElementById(
      'txtHeader'
    ) as HTMLInputElement;
    this.contentElement = document.getElementById(
      'txtContent'
    ) as HTMLTextAreaElement;
    console.log('ng afterviewint:');
    console.log(this.currentFile);
    //this.updateContent()
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnDestroy(): void {
    /*if (this.activity == false) {
      this.fileservice.deleteFileById(this.newFile.id);
    }*/
    console.log('closing new file: ' + this.newFile.serverid);
  }

  generateId(): string {
    const value = (Math.trunc(Math.random() * 10000)).toString();
    if (this.fileservice.checkIdIfPresent(value)) {
      return this.generateId();
    } else {
      return value;
    }
  }

  updateContent(): void {
    this.headerElement = document.getElementById(
      'txtHeader'
    ) as HTMLInputElement;
    this.contentElement = document.getElementById(
      'txtContent'
    ) as HTMLTextAreaElement;
    if (this.currentFile) {
      this.headerElement.value = this.currentFile.fileTitle;
      this.contentElement.value = this.currentFile.fileBody;
    } else {
      this.resetValues();
    }
    this.openPanel = false;
    console.log('content updated');
  }

  resetValues(): void {
    this.headerElement.value = '';
    this.contentElement.value = '';
  }

  navigateToEditor(id: string) {
    this.router.navigate(['/editor', id]);
  }

  saveFile(): void {
    this.headerElement = document.getElementById(
      'txtHeader'
    ) as HTMLInputElement;
    this.contentElement = document.getElementById(
      'txtContent'
    ) as HTMLTextAreaElement;
    if (this.currentFile) {
      this.currentFile.fileTitle = this.headerElement.value;
      this.currentFile.fileBody = this.contentElement.value;
      this.currentFile.updatedAt = new Date();
      //console.log(this.currentFile)
      if (this.fileservice.checkIdIfPresent(this.currentFile.serverid!)) {
        this.fileservice.updateFile(this.currentFile);
        console.log('file updated');
      } else {
        try {
          this.fileservice.pushFile(this.currentFile);
          this.navigateToEditor(this.currentFile.serverid!);
        } catch (error) {
          console.error('Error saving file:', error);
          // Ignoring the error and continuing
        }
        //console.log(this.currentFile);
        console.log('file pushed');
      }
    }
  }


  //download and upload-------------------------------
  onDownload(): void {
    if (this.headerElement.value === '' || this.contentElement.value === '') {
      window.alert('Please enter File name and content');
    } else {
      const content = this.contentElement.value;
      const link = document.createElement('a');
      link.download = this.headerElement.value + '.txt';

      const blob = new Blob([content], {
        type: 'text/plain',
      });

      link.href = window.URL.createObjectURL(blob);
      link.click();
    }
  }

  onFileSelected(event: Event): void {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.headerElement = document.getElementById(
        'txtHeader'
      ) as HTMLInputElement;
      this.contentElement = document.getElementById(
        'txtContent'
      ) as HTMLTextAreaElement;
      this.contentElement.value = e.target!.result as string;
      this.headerElement.value = file.name;
      this.activityTrue();
    };

    reader.readAsText(file);
  }

  uploadFile(): void {
    event!.preventDefault();
    //this.saveFile()
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  //popus-------------------------------------

  activity: boolean = false;
  activityTrue(): void {
    this.activity = true;
  }

  //For Share Componenet
  isSharePopupVisible?: boolean;
  showSharePopup(): void {
    this.isSharePopupVisible = true;
    console.log('popup: ' + this.isSharePopupVisible);
    //this.saveFile();
  }

  closeSharePopup(): void {
    this.isSharePopupVisible = false;
    if (this.activity) {
      this.saveFile();
    }
  }
  //For Open-Component
  openPanel: boolean = false;
  showOpenPanel() {
    this.openPanel = !this.openPanel;
  }
  isPopupVisible = false;
  showPopup(): void {
    this.openPanel = true;
  }
  closePopup(event: Event): void {
    this.openPanel = false;
  }
  //for info Component
  isInfoPopupVisible = false;
  showInfoPopup(): void {
    this.isInfoPopupVisible = true;
  }
  closeInfoPopup(): void {
    this.isInfoPopupVisible = false;
  }
}
