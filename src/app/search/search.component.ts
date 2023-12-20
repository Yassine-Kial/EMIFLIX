import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  movies: any[] = [];
  
    route: ActivatedRoute = inject(ActivatedRoute);



  constructor(private apiService: ApiService) { }

  search7(query: string): void {
        console.log('Search query:', query);
    this.apiService.searchMovies(query).subscribe(
      (data) => {
        console.log(data);
        this.movies = data.results.map((movie: any) => ({
        name: movie.title,
        thumbnail: `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`,
        id : movie.id,
      }));
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );
  }
  



}
