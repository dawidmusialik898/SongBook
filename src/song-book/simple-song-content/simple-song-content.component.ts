import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { SimpleSongDTO } from 'src/songs-api-client';
import { ActivatedRoute } from '@angular/router';
import { SongRepositoryService } from '../song-repository.service';

@Component({
  selector: 'sb-simple-song-content',
  templateUrl: './simple-song-content.component.html',
  styleUrls: ['./simple-song-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleSongContentComponent implements OnInit {

  protected song$?: Observable<SimpleSongDTO>;

  constructor(
    private route: ActivatedRoute,
    private repository: SongRepositoryService) { }

  ngOnInit() {
    this.song$ = this.route.params.pipe(switchMap(params => {
      return this.repository.getSimpleSong(params['id']) as Observable<any>
    }))
  }
}
