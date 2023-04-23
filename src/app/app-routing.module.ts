import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SongBookComponent } from 'src/song-book/song-book/song-book.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
