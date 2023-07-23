import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SimpleSongDTO } from 'src/songs-api-client';
import { ActivatedRoute } from '@angular/router';
import { SongRepositoryService } from '../song-repository.service';

@Component({
  selector: 'sb-simple-song-content',
  templateUrl: './simple-song-content.component.html',
  styleUrls: ['./simple-song-content.component.scss'],
})
export class SimpleSongContentComponent implements OnInit, OnDestroy {

  protected song$?: Observable<SimpleSongDTO>
  private paramMapSub: Subscription | undefined

  constructor(
    private route: ActivatedRoute,
    private repository: SongRepositoryService) { }

  ngOnInit() {
    this.paramMapSub = this.route.paramMap.subscribe(value => {
      this.repository.setSelectedSong(value.get('id'))
      this.song$ = this.repository.getSelectedSimpleSong()
    })
  }

  ngOnDestroy(): void {
    if (this.paramMapSub !== undefined) {
      this.paramMapSub.unsubscribe()
    }
  }
}
