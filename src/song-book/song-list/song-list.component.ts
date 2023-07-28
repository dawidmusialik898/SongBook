import { Component, OnInit } from '@angular/core'
import { SimpleSongDTO } from '../../songs-api-client'
import { Observable } from 'rxjs';
import { SongRepositoryService } from '../song-repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sb-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {

  searchValue: string = ''
  songs$?: Observable<SimpleSongDTO[]>

  constructor(
    private repository: SongRepositoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.songs$ = this.repository.getSimpleSongs()
  }

  onSongsRefresh(): void {
    this.repository.fetchSimpleSongs()
  }

  getProperUrl(songId?: string): string {
    if (songId === undefined) {
      songId = ''
    }

    if (this.router.url.endsWith('/edit')) {
      return songId + '/edit'
    }
    else {
      return songId
    }
  }
}

//tutorial 9:35
//now need to do some coding
