import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from '../movie/movie.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MovieComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
