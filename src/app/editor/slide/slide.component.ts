import { Component,Input,Output,EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
//import { OpenComponent } from '../open/open.component';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MatButtonModule,
    MatButton,
    MatButtonToggleModule,
    MatIcon,
    MatToolbarModule,
    MatMenuModule,MatTooltipModule
  ],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.css',
})
export class SlideComponent {
  thememode: string = 'lightmode';

  @Output() downloadFile = new EventEmitter();
  @Output() openFile = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() share = new EventEmitter();
  @Output() help = new EventEmitter();
  @Output() uploadFile = new EventEmitter();

  downloadBtn() {
    this.downloadFile.emit();
  }
  uploadBtn() {
    this.uploadFile.emit();
  }
  openBtn() {
    this.openFile.emit();
  }
  saveBtn() {
    this.save.emit();
  }
  shareBtn() {
    this.share.emit();
  }
  helpBtn() {
    this.help.emit();
  }
  ///

  constructor(private themeService: ThemeService) {}

  changeTheme() {
    this.themeService.toggleTheme();
  }
}