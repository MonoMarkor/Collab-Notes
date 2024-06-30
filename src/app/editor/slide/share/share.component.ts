import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorComponent } from '../../editor.component';

@Component({
  selector: 'app-share',
  standalone: true,
  imports: [CommonModule, EditorComponent],
  templateUrl: './share.component.html',
  styleUrl: './share.component.css',
})
export class ShareComponent {
  @Output() closeShare = new EventEmitter();
  close(): void {
    this.closeShare.emit();
  }

  currentUrl: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.currentUrl = window.location.href; // Capture the current URL
  }
  copyLink(inputElement: HTMLInputElement): void {
    inputElement.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
  }
}
