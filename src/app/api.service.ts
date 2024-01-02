import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ApiService {
  private springUrl = 'http://localhost:8080/api/v1/comment';
  private apiUrl = 'https://api.themoviedb.org/3/discover/movie';
  private apiUrl2 = 'https://api.themoviedb.org/3/movie';
  private apiUrl3 = 'https://api.themoviedb.org/3/search/movie';
  private springUrl2 = 'http://localhost:8080/api/v1/favorite';



  private apiKey = 'd7defeea31706576d24b6872549308c0';
  constructor(private http: HttpClient) { }
  getMovies(genre:any): Observable<any> {
    const url = `${this.apiUrl}?api_key=${this.apiKey}&with_genres=${genre}`;
    return this.http.get(url);
  }
  getMovieDetails(id: number): Observable<any> {
    const url = `${this.apiUrl2}/${id}?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  searchMovies(query: string): Observable<any> {
    const url = `${this.apiUrl3}?api_key=${this.apiKey}&query=${query}`;
    return this.http.get(url);
  }
   addNewSpringMovie(movie: any): Observable<any> {
     const url = `${this.springUrl}`;
    return this.http.post(url, movie);
   }
  
  getRecommendedMovies(id: number):Observable<any> {
    const url = `${this.apiUrl2}/${id}/recommendations?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  getCommentMovie(id: any): Observable<any> {

    const url = `${this.springUrl}/${id}`;   
    return this.http.get(url);
  }


  addFavoriteMovie(favorite: any): Observable<any> {
     const url = `${this.springUrl2}`;
    return this.http.post(url, favorite);
  }

  getFavoriteMovies(email: any): Observable<any> {
    const url = `${this.springUrl2}/${email}`;
    return this.http.get(url);
  }

}
