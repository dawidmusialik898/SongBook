import { Component, OnInit, SkipSelf } from '@angular/core';
import { SimpleSongDTO, SongItemListDTO } from 'src/songs-api-client/model/models';
import { SongRepositoryService } from '../song-repository.service';

@Component({
  selector: 'sb-song-book',
  templateUrl: './song-book.component.html',
  styleUrls: ['./song-book.component.scss']
})
export class SongBookComponent implements OnInit {
  songs: SimpleSongDTO[] = []
  selectedSong!: SimpleSongDTO


  constructor(
    @SkipSelf() private songRepositoryService: SongRepositoryService) {
  }

  ngOnInit() {
    this.songs = this.songRepositoryService.getSimpleSongs();
  }

  selectSong(selectedSong: SongItemListDTO) {
    this.selectedSong = this.songs.filter(s => s.id === selectedSong.id)[0]
  }
}
