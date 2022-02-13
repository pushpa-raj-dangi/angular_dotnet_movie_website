import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { DetailsComponent } from './movies/details/details.component';
import { EditGenreComponent } from './genres/edit-genre/edit-genre.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { EditTheaterComponent } from './theaters/edit-theater/edit-theater.component';
import { EditActorComponent } from './actors/edit-actor/edit-actor.component';
import { CreateTheaterComponent } from './theaters/create-theater/create-theater.component';
import { IndexTheatersComponent } from './theaters/index-theaters/index-theaters.component';
import { CreateActorComponent } from './actors/create-actor/create-actor.component';
import { IndexActorsComponent } from './actors/index-actors/index-actors.component';
import { CreateMovieComponent } from './movies/create-movie/create-movie.component';
import { CreateGenreComponent } from './genres/create-genre/create-genre.component';
import { IndexGenresComponent } from './genres/index-genres/index-genres.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieFilterComponent } from './movies/movie-filter/movie-filter.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'genres', component: IndexGenresComponent, canActivate:[IsAdminGuard] },
  { path: 'genres/create', component: CreateGenreComponent,  canActivate:[IsAdminGuard] },
  { path: 'genres/edit/:id', component: EditGenreComponent,  canActivate:[IsAdminGuard] },


  { path: 'movies/create', component: CreateMovieComponent, canActivate:[IsAdminGuard] },
  { path: 'movies/edit/:id', component: EditMovieComponent, canActivate:[IsAdminGuard] },
  { path: 'movies/details/:id', component: DetailsComponent, canActivate:[IsAdminGuard] },
  { path: 'movies/filter', component: MovieFilterComponent },

  { path: 'actors', component: IndexActorsComponent, canActivate:[IsAdminGuard] },
  { path: 'actors/create', component: CreateActorComponent, canActivate:[IsAdminGuard] },
  { path: 'actors/edit/:id', component: EditActorComponent, canActivate:[IsAdminGuard] },

  { path: 'theaters', component: IndexTheatersComponent, canActivate:[IsAdminGuard] },
  { path: 'theaters/create', component: CreateTheaterComponent, canActivate:[IsAdminGuard] },
  { path: 'theaters/edit/:id', component: EditTheaterComponent, canActivate:[IsAdminGuard] },

  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},

  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
