import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router} from '@angular/router';
import { AuthService } from '../authentification.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  constructor(private authService: AuthService, private router:Router) {}


  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);

  }


  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }


  signIn() {
    this.router.navigate(['login']);
  }
  
}
