import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { AuthService } from '../authentification.service';
import { UserInfoReponse } from '../authentification.service';
import { MovieSliderComponent } from '../movie-slider/movie-slider.component';
@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule, MovieSliderComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {

  FavoriteMovies: any[] = [];
  extractedMovieIds: any[] = [];
  movieDetailsList: any[] = [];

  userInfo: UserInfoReponse = {
    firstName: '',
    lastName: '',
    email: '',

  };

  constructor(private apiService: ApiService, private authService: AuthService) { }
  

  

  ngOnInit() {

    this.authService.getUserInfo().subscribe(
      (data: UserInfoReponse) => {
        this.userInfo = data;
        console.log('User Info:', this.userInfo);

        this.apiService.getFavoriteMovies(this.userInfo.email).subscribe(
          (favoriteMovies: any[]) => {
            this.FavoriteMovies = favoriteMovies;

            this.extractedMovieIds = this.FavoriteMovies.map((favoriteMovie) => favoriteMovie.id.movieId);

            console.log('Favorite Movies:', this.FavoriteMovies);
            console.log('Extracted Movie Ids:', this.extractedMovieIds);
            this.fetchMovieDetailsForExtractedIds();
          },
          (error) => {
            console.error('Error fetching favorite movies:', error);
          }
        );
      },
      (error) => {
        // Handle error response from getUserInfo
        console.error('Error fetching user info:', error);
      }
    );

  }


  fetchMovieDetailsForExtractedIds() {
    for (const movieId of this.extractedMovieIds) {
      this.apiService.getMovieDetails(movieId).subscribe(
        (data) => {
          const movieDetails = {
            name: data.title,
            thumbnail: `https://image.tmdb.org/t/p/w300${data.backdrop_path}`,
            releaseDate: data.release_date,
            genre: data.genre_ids,
            id: data.id,
            description: data.overview,
            rating: data.vote_average,
            originalLanguage: data.original_language,
          };

          // Do something with movieDetails, e.g., push it to a list
          this.movieDetailsList.push(movieDetails);
          console.log('Movie details fetched successfully:', movieDetails);
        },
        (error) => {
          console.error('Error fetching movie details:', error);
        }
      );
    }
  
  }
  
}
