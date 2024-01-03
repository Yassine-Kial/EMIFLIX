import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { MovieSliderComponent } from '../movie-slider/movie-slider.component';
import { RouterModule,Router} from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MovieSliderComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private apiService:ApiService, private router:Router) {}

  actionMovies: any[] = [];
  scienceFictionMovies: any[] = [];
  romanceMovies: any[] = [];
  crimeMovies: any[] = [];
  comedyMovies: any[] = [];
  historyMovies: any[] = [];






  ngOnInit() {

  this.apiService.getMovies(28).subscribe(
    (data) => {
      // Extract only the necessary information (name and thumbnail) from each movie
      this.actionMovies = data.results.map((movie: any) => ({
        name: movie.title,
        thumbnail: `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`,
        id: movie.id,
        image: movie.backdrop_path,
      }));
    },
    (error) => {
      console.error("Error fetching action movies", error);
    }
  );
  
    
    this.apiService.getMovies(10402).subscribe(
    (data) => {
      // Extract only the necessary information (name and thumbnail) from each movie
      this.romanceMovies = data.results.map((movie: any) => ({
        name: movie.title,
        thumbnail: `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`,
        id: movie.id,
                image: movie.backdrop_path,

      }));
    },
    (error) => {
      console.error("Error fetching action movies", error);
    }
    );
    

     
    this.apiService.getMovies(878).subscribe(
    (data) => {
      // Extract only the necessary information (name and thumbnail) from each movie
      this.scienceFictionMovies = data.results.map((movie: any) => ({
        name: movie.title,
        thumbnail: `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`,
        id: movie.id,
                image: movie.backdrop_path,

      }));
    },
    (error) => {
      console.error("Error fetching action movies", error);
    }
    );
    
    this.apiService.getMovies(80).subscribe(
    (data) => {
      // Extract only the necessary information (name and thumbnail) from each movie
      this.crimeMovies = data.results.map((movie: any) => ({
        name: movie.title,
        thumbnail: `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`,
        id: movie.id,
                image: movie.backdrop_path,

      }));
    },
    (error) => {
      console.error("Error fetching action movies", error);
    }
    );
    
    this.apiService.getMovies(35).subscribe(
    (data) => {
      // Extract only the necessary information (name and thumbnail) from each movie
      this.comedyMovies = data.results.map((movie: any) => ({
        name: movie.title,
        thumbnail: `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`,
        id: movie.id,
                image: movie.backdrop_path,

      }));
    },
    (error) => {
      console.error("Error fetching action movies", error);
    }
    );
    
    this.apiService.getMovies(36).subscribe(
    (data) => {
      // Extract only the necessary information (name and thumbnail) from each movie
      this.historyMovies = data.results.map((movie: any) => ({
        name: movie.title,
        thumbnail: `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`,
        id: movie.id,
                image: movie.backdrop_path,

      }));
    },
    (error) => {
      console.error("Error fetching action movies", error);
    }
  );
    
    
    

    
    
    
  }
  


  joinNow() {

    this.router.navigate(['login']);

  }





}
