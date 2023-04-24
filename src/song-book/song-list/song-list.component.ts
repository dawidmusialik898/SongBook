import { Component, Output, EventEmitter, Input } from '@angular/core'
import { SongItemListDTO } from '../../songs-api-client'
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent {

  value: string = ''
  @Input() songs?: Observable<SongItemListDTO[]>
  @Output() selectSongEvent = new EventEmitter<SongItemListDTO>()
  @Output() updateSongsEvent = new EventEmitter()

  onSongSelect(song: SongItemListDTO) {
    this.selectSongEvent.emit(song)
  }

  onSongsUpdate() {
    this.updateSongsEvent.emit()
  }
}

//tutorial 9:35
//now need to do some coding
