import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './song-list/song-list.component';
import { ApiModule } from '../songs-api-client';
import { NgMaterialModule } from 'src/ng-material/ng-material.module';



@NgModule({
  declarations: [SongListComponent],
  imports: [
    CommonModule,
    ApiModule,
    NgMaterialModule,
  ]
})
export class SongBookModule { }
