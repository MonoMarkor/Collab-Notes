import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Files } from '../../../services/files';
import { RouterModule } from '@angular/router';
import { MaxLenPipe } from '../../home-panel/home-pipes/max-len.pipe';
import { DateFormat1Pipe } from '../../home-panel/home-pipes/date-format1.pipe';

@Component({
  selector: 'app-home-files',
  standalone: true,
  imports: [RouterModule, CommonModule, MaxLenPipe,DateFormat1Pipe],
  templateUrl: './home-files.component.html',
  styleUrl: './home-files.component.css',
})
export class HomeFilesComponent {
  @Input() filesLocation!: Files;
}
