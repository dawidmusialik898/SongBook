import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './song-list/song-list.component';
import { ApiModule } from '../songs-api-client';



@NgModule({
  declarations: [SongListComponent],
  imports: [
    CommonModule,
    ApiModule
  ]
})
export class SongBookModule { }
