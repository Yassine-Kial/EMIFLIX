import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
}

export interface UserInfoReponse {
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8081/api/v1/auth';
  private tokenKey = 'jwtToken';
  private jwtHelper = new JwtHelperService();

  private localStorageAvailable: boolean;

  constructor(private http: HttpClient) {
    this.localStorageAvailable = this.checkLocalStorageAvailability();
  }

  private checkLocalStorageAvailability(): boolean {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }

  register(request: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/register`, request);
  }

  authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, request)
      .pipe(
        tap(response => this.storeToken(response.token))
      );
  }

  private storeToken(token: string): void {
    if (this.localStorageAvailable) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      console.error('localStorage is not available.');
      // Handle the case where localStorage is not available
    }
  }

  getToken(): string | null {
    return this.localStorageAvailable ? localStorage.getItem(this.tokenKey) : null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token || '');
  }

  logout(): void {
    if (this.localStorageAvailable) {
      localStorage.removeItem(this.tokenKey);
    } else {
      console.error('localStorage is not available.');
      // Handle the case where localStorage is not available
    }
  }

  getUserInfo(): Observable<UserInfoReponse> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UserInfoReponse>(`${this.baseUrl}/user-info`, { headers });
  }
}
