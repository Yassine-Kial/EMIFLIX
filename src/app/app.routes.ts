import { Routes } from '@angular/router';

import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

    { path : '', component: HomeComponent, title :"Home Page"},
    { path: 'movie/:id', component: MovieDetailComponent, title: "Details Page" },
    { path: 'search', component: SearchComponent, title: "Search Page"},
    { path: 'login', component: LoginComponent, title: "Login Page" },
    { path : 'register', component: RegisterComponent, title :"register"},
    { path: 'favorites', component: FavoriteComponent, title:"Favorites Page", canActivate : [AuthGuard]}

];
