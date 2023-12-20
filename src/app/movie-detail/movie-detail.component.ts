import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';



@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
  
})
export class MovieDetailComponent {


  movieDetails: any = {};
  
  route: ActivatedRoute = inject(ActivatedRoute);
  movieId = 0;

  constructor(private apiService: ApiService) {

    this.movieId = Number(this.route.snapshot.params['id']);
   }
  


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
    });
  this.apiService.getMovieDetails(this.movieId).subscribe(
    (data) => {
      this.movieDetails = {
          name: data.title,
          thumbnail: `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`,
          releaseDate: data.release_date,
          genre: data.genre_ids,
        id: data.id,
        description: data.overview,
        rating: data.vote_average,
          originalLanguage : data.original_language,
        };
    },
    (error) => {
      console.error("Error fetching action movies", error);
    }
  );
}





 




}
