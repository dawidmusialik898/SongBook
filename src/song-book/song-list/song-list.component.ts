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
  value: string = '';

  constructor(public songService: SimpleSongService) {
  }
  onSongSelect(song: SimpleSongDTO) {
    this.selectedSong = song;
  }

  ngOnInit() {
    console.log("on init was called");
    this.songService.apiSimpleSongGet().subscribe(s => this.songs = s);
  }
}

//tutorial 6:45
