import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Observer } from 'rxjs';
import { SimpleSongDTO, SimpleSongService, StructuredSongDTO, StructuredSongService } from 'src/songs-api-client';

@Injectable({
  providedIn: 'root'
})
export class SongRepositoryService {

  private simpleSongs: SimpleSongDTO[]
  private structuredSongs: StructuredSongDTO[]

  private simpleSongsSubject$: BehaviorSubject<SimpleSongDTO[]>
  private selectedSimpleSongSubject$: BehaviorSubject<SimpleSongDTO>
  private selectedSongId: string | undefined

  private structuredSongsSubject$: BehaviorSubject<StructuredSongDTO[]>
  private selectedStructuredSongSubject$: BehaviorSubject<StructuredSongDTO>

  private readonly simpleSongsObserver: Observer<SimpleSongDTO[]> = {
    next: x => {
      this.simpleSongsSubject$.next(x)
      this.simpleSongs = x
    },
    error: err => console.error('Observer got an error: ' + err),
    complete: () => {
      if (this.selectedSongId !== undefined) {
        this.setSelectedSong(this.selectedSongId)
      }
    },
  }

  private readonly structuredSongsObserver: Observer<StructuredSongDTO[]> = {
    next: x => {
      this.structuredSongsSubject$.next(x)
      this.structuredSongs = x
    },
    error: err => console.error('Observer got an error: ' + err),
    complete: () => {
      if (this.selectedSongId !== undefined) {
        this.setSelectedSong(this.selectedSongId)
      }
    },
  }

  constructor(
    private readonly simpleSongService: SimpleSongService,
    private readonly structuredSongService: StructuredSongService) {

    this.simpleSongs = []
    this.structuredSongs = []

    this.simpleSongsSubject$ = new BehaviorSubject<SimpleSongDTO[]>([])
    this.structuredSongsSubject$ = new BehaviorSubject<StructuredSongDTO[]>([])

    this.selectedSimpleSongSubject$ = new BehaviorSubject<SimpleSongDTO>({})
    this.selectedStructuredSongSubject$ = new BehaviorSubject<StructuredSongDTO>({})

    this.initializeSongsCollections()
  }

  public getSimpleSongs(): Observable<SimpleSongDTO[]> {
    return this.simpleSongsSubject$.asObservable()
  }

  public getStructuredSongs(): Observable<StructuredSongDTO[]> {
    return this.structuredSongsSubject$.asObservable()
  }

  public getSelectedSimpleSong(): Observable<SimpleSongDTO> {
    return this.selectedSimpleSongSubject$.asObservable()
  }

  public getSelectedStructuredSong(): Observable<StructuredSongDTO> {
    return this.selectedStructuredSongSubject$.asObservable()
  }

  public getSimpleSongById(id: string | null): SimpleSongDTO | undefined {
    if (id === null) {
      return undefined
    }
    return this.simpleSongs.filter(x => x.id === id)[0]
  }

  public getStructuredSongById(id: string | null): SimpleSongDTO | undefined {
    if (id === null) {
      return undefined
    }
    return this.structuredSongs.filter(x => x.id === id)[0]
  }

  public fetchSimpleSongs(): void {
    this.initializeSongsCollections()
  }

  public setSelectedSong(id: string | null): void {
    if (id === null) {
      return
    }

    this.selectedSongId = id

    let selectedSimpleSong = this.simpleSongs.filter(x => x.id === id)[0]
    this.selectedSimpleSongSubject$.next(selectedSimpleSong)

    let selectedStructuredSong = this.structuredSongs.filter(x => x.id === id)[0]
    this.selectedStructuredSongSubject$.next(selectedStructuredSong)
  }



  private initializeSongsCollections(): void {

    this.simpleSongService.apiSimpleSongGet().subscribe(this.simpleSongsObserver)

    this.structuredSongService.apiStructuredSongGet().subscribe(this.structuredSongsObserver)
  }
}
