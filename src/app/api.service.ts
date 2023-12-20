import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ApiService {
  private apiUrl = 'https://api.themoviedb.org/3/discover/movie';
  private apiUrl2 = 'https://api.themoviedb.org/3/movie';
  private apiUrl3 = 'https://api.themoviedb.org/3/search/movie'

  private apiKey = 'd7defeea31706576d24b6872549308c0';
  constructor(private http: HttpClient) { }
  getMovies(): Observable<any> {
    const url = `${this.apiUrl}?api_key=${this.apiKey}&with_genres=28`;
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
}
