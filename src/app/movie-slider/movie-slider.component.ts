import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { error } from 'console';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-slider.component.html',
  styleUrl: './movie-slider.component.css'
})
  

export class MovieSliderComponent {


  movies: any[] = [];

  constructor(private apiService: ApiService) { }


 ngOnInit() {
  this.apiService.getMovies().subscribe(
    (data) => {
      // Extract only the necessary information (name and thumbnail) from each movie
      this.movies = data.results.map((movie: any) => ({
        name: movie.title,
        thumbnail: `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`,
        id : movie.id,
      }));
    },
    (error) => {
      console.error("Error fetching action movies", error);
    }
  );
}


  currentIndex = 0;
  moviesPerPage = 2;
  get visibleMovies(): any[] {
    const startIndex = this.currentIndex;
    const endIndex = startIndex + this.moviesPerPage;
    return this.movies.slice(startIndex, endIndex);
  }

  next() {
    if (this.currentIndex < this.movies.length - this.moviesPerPage) {
      this.currentIndex += 1;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    }
  }
}
