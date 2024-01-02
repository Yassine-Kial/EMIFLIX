import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

  
export interface RegisterRequest {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

export interface AuthenticationRequest {
  email: string;
  password: string;

}

export interface AuthenticationResponse {
  token: string;
}
export interface UserInfoReponse {
  firstName:string;
    lastName:string;
    email:string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8081/api/v1/auth';
  private tokenKey = 'jwtToken';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  register(request: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/register`, request);
  }

  authenticate(request: {
    email: any,
    password:any
  }): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, request)
      .pipe(
        tap(response => this.storeToken(response.token))
      );
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !this.jwtHelper.isTokenExpired(this.getToken() || '');
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getUserInfo(): Observable<UserInfoReponse> {
    console.log("kaka");
    const token = this.getToken();
    console.log(token);
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });    return this.http.get<UserInfoReponse>(`${this.baseUrl}/user-info`,{ headers });
  }
}
