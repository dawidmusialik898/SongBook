import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SimpleSongDTO } from 'src/songs-api-client';

@Component({
  selector: 'sb-simple-song-content',
  templateUrl: './simple-song-content.component.html',
  styleUrls: ['./simple-song-content.component.scss']
})
export class SimpleSongContentComponent {
  @Input() song?: Observable<SimpleSongDTO>
}
