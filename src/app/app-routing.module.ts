import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SongBookComponent } from 'src/song-book/song-book/song-book.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'songs', component: SongBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
