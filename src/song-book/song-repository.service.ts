import { Injectable, OnDestroy, OnInit, Optional, SkipSelf } from '@angular/core';
import { Subscription } from 'rxjs';
import { SimpleSongDTO, SimpleSongService, StructuredSongDTO, StructuredSongService } from 'src/songs-api-client';

@Injectable({
  providedIn: 'root'
})
export class SongRepositoryService implements OnInit, OnDestroy {

  private simpleSongs: SimpleSongDTO[] = [];
  private structuredSongs: StructuredSongDTO[] = [];

  private simpleSongsSub?: Subscription;
  private structuredSongsSub?: Subscription;

  constructor(
    @SkipSelf() private readonly simpleSongService: SimpleSongService,
    @SkipSelf() private readonly structuredSongService: StructuredSongService) { }

  ngOnInit(): void {
    this.simpleSongsSub = this.simpleSongService.apiSimpleSongGet().subscribe(s => this.simpleSongs = s);
    this.structuredSongsSub = this.structuredSongService.apiStructuredSongGet().subscribe(s => this.structuredSongs = s);
  }

  ngOnDestroy(): void {
    this.simpleSongsSub?.unsubscribe();
    this.structuredSongsSub?.unsubscribe();
  }

  public getSimpleSongs(): SimpleSongDTO[] {
    return this.simpleSongs;
  }

  public getStructuredSongs(): StructuredSongDTO[] {
    return this.structuredSongs;
  }

}
