import { Component, Input, OnInit } from '@angular/core'
import { SimpleSongDTO, SimpleSongService } from '../../songs-api-client'

@Component({
  selector: 'sb-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {
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

//tutorial 4:47
