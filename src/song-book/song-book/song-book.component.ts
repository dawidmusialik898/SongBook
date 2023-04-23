import { Component, OnInit, SkipSelf } from '@angular/core';
import { SimpleSongDTO, SongItemListDTO } from 'src/songs-api-client/model/models';
import { SongRepositoryService } from '../song-repository.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sb-song-book',
  templateUrl: './song-book.component.html',
  styleUrls: ['./song-book.component.scss']
})
export class SongBookComponent implements OnInit {
  songs: Observable<SimpleSongDTO[]> = new Observable<SimpleSongDTO[]>()
  selectedSong?: Observable<SimpleSongDTO>


  constructor(
    @SkipSelf() private songRepositoryService: SongRepositoryService) {
  }

  ngOnInit() {
    this.songs = this.songRepositoryService.getSimpleSongs()
  }

  selectSong(selectedSong: SongItemListDTO) {
    if (this.songs !== undefined) {
      this.selectedSong = this.songs.pipe(map(songs => songs.filter(s => s.id === selectedSong.id)[0]))
    }
  }
}
