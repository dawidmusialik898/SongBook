import { Component, Input } from '@angular/core'
import { SimpleSongDTO, SimpleSongService } from 'src/song-book-service-api-client';

@Component({
  selector: 'sb-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent {
  songs: SimpleSongDTO[] = [];
  selectedSong: SimpleSongDTO | null = null;

  constructor(public songService: SimpleSongService) {
  }
  onSongSelect(song: SimpleSongDTO) {
    this.selectedSong = song;
  }

  ngOnInit() {
    this.songService.apiSimpleSongGet().subscribe(s => this.songs = s);
  }
}
