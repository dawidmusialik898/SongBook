import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { StructuredSongDTO } from 'src/songs-api-client';
import { SongRepositoryService } from '../song-repository.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sb-structured-song-content',
  templateUrl: './structured-song-content.component.html',
  styleUrls: ['./structured-song-content.component.scss']
})
export class StructuredSongContentComponent implements OnInit, OnDestroy {

  protected song?: StructuredSongDTO
  private songSub?: Subscription

  constructor(private repository: SongRepositoryService, private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.songSub?.unsubscribe()
  }
  ngOnInit(): void {
    this.route.params.pipe(switchMap(params => {
      return this.repository.getStructuredSong(params['id']) as Observable<any>
    })).subscribe(s => this.song = s)
  }

  onClick() {
    console.log(this.song)
  }
}
