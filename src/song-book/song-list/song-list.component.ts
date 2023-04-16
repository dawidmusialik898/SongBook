import { Component, Output, EventEmitter, Input } from '@angular/core'
import { SimpleSongDTO, SongItemListDTO } from '../../songs-api-client'

@Component({
  selector: 'sb-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent {

  value: string = '';
  @Input() songs: SongItemListDTO[] = [];
  @Output() selectSongEvent = new EventEmitter<SongItemListDTO>();


  onSongSelect(song: SongItemListDTO) {
    this.selectSongEvent.emit(song);
  }
}

//tutorial 6:45
