import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { RouterModule} from '@angular/router';
import { MovieSliderComponent } from './movie-slider/movie-slider.component';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,DashboardComponent, HeaderComponent, HttpClientModule, MovieSliderComponent,RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebAppMovies';
}
