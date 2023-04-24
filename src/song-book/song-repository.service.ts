import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SimpleSongDTO, SimpleSongService, StructuredSongDTO, StructuredSongService } from 'src/songs-api-client';

@Injectable({
  providedIn: 'root'
})
export class SongRepositoryService {

  private simpleSongs: Observable<SimpleSongDTO[]>
  private structuredSongs: Observable<StructuredSongDTO[]>

  constructor(
    private readonly simpleSongService: SimpleSongService,
    private readonly structuredSongService: StructuredSongService) {
    this.simpleSongs = this.simpleSongService.apiSimpleSongGet()
    this.structuredSongs = this.structuredSongService.apiStructuredSongGet()
  }

  public getSimpleSongs(): Observable<SimpleSongDTO[]> {
    return this.simpleSongs
  }

  public getStructuredSongs(): Observable<StructuredSongDTO[]> {
    return this.structuredSongs;
  }

  public updateSimpleSongs(): Observable<SimpleSongDTO[]> {
    this.simpleSongs = this.simpleSongService.apiSimpleSongGet()
    return this.simpleSongs
  }
}
