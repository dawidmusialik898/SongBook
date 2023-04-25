import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SongBookComponent } from 'src/song-book/song-book/song-book.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SimpleSongContentComponent } from 'src/song-book/simple-song-content/simple-song-content.component';
import { StructuredSongContentComponent } from 'src/song-book/structured-song-content/structured-song-content.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    title: 'Homepage',
  },
  {
    path: 'songs',
    component: SongBookComponent,
    title: 'SongBook',
    children: [{
      path: ":id", component: SimpleSongContentComponent,
    },
    {
      path: ":id/edit", component: StructuredSongContentComponent
    }]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page Not Found',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
