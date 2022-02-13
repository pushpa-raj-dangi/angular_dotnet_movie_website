import { MarkdownModule } from 'ngx-markdown';

import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { RatingComponent } from './utils/rating/rating.component';
import { HomeComponent } from './home/home.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { IndexGenresComponent } from './genres/index-genres/index-genres.component';
import { CreateGenreComponent } from './genres/create-genre/create-genre.component';
import { IndexActorsComponent } from './actors/index-actors/index-actors.component';
import { CreateActorComponent } from './actors/create-actor/create-actor.component';
import { IndexTheatersComponent } from './theaters/index-theaters/index-theaters.component';
import { CreateTheaterComponent } from './theaters/create-theater/create-theater.component';
import { CreateMovieComponent } from './movies/create-movie/create-movie.component';
import { EditActorComponent } from './actors/edit-actor/edit-actor.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { EditGenreComponent } from './genres/edit-genre/edit-genre.component';
import { EditTheaterComponent } from './theaters/edit-theater/edit-theater.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenreFormComponent } from './genres/genre-form/genre-form.component';
import { MovieFilterComponent } from './movies/movie-filter/movie-filter.component';
import { ActorFormComponent } from './actors/actor-form/actor-form.component';
import { InputImgComponent } from './utils/input-img/input-img.component';
import { MarkdownComponent } from './utils/markdown/markdown.component';
import { TheaterFormComponent } from './theaters/theater-form/theater-form.component';
import { MapComponent } from './utils/map/map.component';
import { MovieFormComponent } from './movies/movie-form/movie-form.component';
import { CustomSelectorComponent } from './utils/custom-selector/custom-selector.component';
import { ActorsAutocompeleteComponent } from './actors/actors-autocompelete/actors-autocompelete.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorsComponent } from './utils/errors/errors.component';
import { DialogComponent } from './utils/dialog/dialog.component';
import { ToastComponent } from './utils/toast/toast.component';
import { CustomListComponent } from './utils/custom-list/custom-list.component';
import { DetailsComponent } from './movies/details/details.component';
import { AuthorizeViewComponent } from './account/authorize-view/authorize-view.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RatingComponent,
    HomeComponent,
    MovieListComponent,
    IndexGenresComponent,
    CreateGenreComponent,
    IndexActorsComponent,
    CreateActorComponent,
    IndexTheatersComponent,
    CreateTheaterComponent,
    CreateMovieComponent,
    EditActorComponent,
    EditMovieComponent,
    EditGenreComponent,
    EditTheaterComponent,
    GenreFormComponent,
    MovieFilterComponent,
    ActorFormComponent,
    InputImgComponent,
    MarkdownComponent,
    TheaterFormComponent,
    MapComponent,
    MovieFormComponent,
    CustomSelectorComponent,
    ActorsAutocompeleteComponent,
    ErrorsComponent,
    DialogComponent,
    ToastComponent,
    CustomListComponent,
    DetailsComponent,
    AuthorizeViewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    MarkdownModule.forRoot(),
    LeafletModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
