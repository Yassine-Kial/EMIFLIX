import { Routes } from '@angular/router';

import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieSliderComponent } from './movie-slider/movie-slider.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [


    { path : '', component: MovieSliderComponent, title :"Home Page"},
    { path: 'movie/:id', component: MovieDetailComponent, title: "Details Page" },
    {path:'search', component : SearchComponent, title : "Search Page"}

];
