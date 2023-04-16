import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './song-list/song-list.component';
import { ApiModule } from '../songs-api-client';
import { NgMaterialModule } from 'src/ng-material/ng-material.module';
import { SimpleSongContentComponent } from './simple-song-content/simple-song-content.component';
import { SongBookComponent } from './song-book/song-book.component';
import { SearchSongPipe } from './search-song.pipe';



@NgModule({
  declarations: [
    SongListComponent,
    SimpleSongContentComponent,
    SongBookComponent,
    SearchSongPipe
  ],
  imports: [
    CommonModule,
    ApiModule,
    NgMaterialModule,
  ]
})
export class SongBookModule { }
