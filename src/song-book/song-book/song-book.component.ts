import { Component, OnInit, SkipSelf } from '@angular/core';
import { SimpleSongDTO, SongItemListDTO } from 'src/songs-api-client/model/models';
import { SongRepositoryService } from '../song-repository.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-song-book',
  templateUrl: './song-book.component.html',
  styleUrls: ['./song-book.component.scss']
})
export class SongBookComponent implements OnInit {
  songs$: Observable<SimpleSongDTO[]> = new Observable<SimpleSongDTO[]>()

  constructor(
    @SkipSelf() private songRepositoryService: SongRepositoryService) {
  }

  ngOnInit() {
    this.songs$ = this.songRepositoryService.getSimpleSongs()
  }

  updateSongs() {
    this.songs$ = this.songRepositoryService.updateSimpleSongs()
  }
}
