import { Component, OnInit } from '@angular/core';
import { SimpleSongService } from 'src/songs-api-client';
import { SimpleSongDTO, SongItemListDTO } from 'src/songs-api-client/model/models';

@Component({
  selector: 'sb-song-book',
  templateUrl: './song-book.component.html',
  styleUrls: ['./song-book.component.scss']
})
export class SongBookComponent implements OnInit {
  songs: SimpleSongDTO[] = [];
  selectedSong!: SimpleSongDTO;


  constructor(public songService: SimpleSongService) {
  }

  ngOnInit() {
    this.songService.apiSimpleSongGet().subscribe(s => this.songs = s);
  }

  selectSong(selectedSong: SongItemListDTO) {
    this.selectedSong = this.songs.filter(s => s.id === selectedSong.id)[0];
  }
}
