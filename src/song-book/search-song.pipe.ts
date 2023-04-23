import { Pipe, PipeTransform } from '@angular/core';
import { SimpleSongDTO, SongItemListDTO } from 'src/songs-api-client';

@Pipe({
  name: 'searchSong'
})
export class SearchSongPipe implements PipeTransform {

  transform(songs: SongItemListDTO[] | null, search: string): SongItemListDTO[] {
    if (songs !== null) {
      return songs.filter(s => {
        return s.title?.toLowerCase().includes(search.toLowerCase()) || s.number?.toLowerCase().includes(search.toLowerCase());
      })
    }
    else {
      return []
    };
  }

}
