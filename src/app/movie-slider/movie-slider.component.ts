import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-slider.component.html',
  styleUrl: './movie-slider.component.css'
})
  

export class MovieSliderComponent {

  @Input() movies: any[] = [];
  @Input() genre: any = "";

}
