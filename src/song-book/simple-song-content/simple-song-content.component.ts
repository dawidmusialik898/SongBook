import { Component, Input } from '@angular/core';
import { SimpleSongDTO } from 'src/songs-api-client';

@Component({
  selector: 'sb-simple-song-content',
  templateUrl: './simple-song-content.component.html',
  styleUrls: ['./simple-song-content.component.scss']
})
export class SimpleSongContentComponent {
  @Input() song!: SimpleSongDTO;

}
