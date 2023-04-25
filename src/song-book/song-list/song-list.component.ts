import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { SimpleSongDTO } from '../../songs-api-client'
import { Observable } from 'rxjs';
import { SongRepositoryService } from '../song-repository.service';

@Component({
  selector: 'sb-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongListComponent implements OnInit {

  searchValue: string = ''
  songs$?: Observable<SimpleSongDTO[]>

  constructor(private repository: SongRepositoryService) { }

  ngOnInit(): void {
    this.songs$ = this.repository.getSimpleSongs()
  }

  onSongsUpdate() {
    this.repository.updateSimpleSongs()
  }
}

//tutorial 9:35
//now need to do some coding
