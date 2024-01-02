import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CommentComponent } from '../comment/comment.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../authentification.service';
import { Router, RouterModule } from '@angular/router';
import { MovieSliderComponent } from '../movie-slider/movie-slider.component';
import { UserInfoReponse } from '../authentification.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, CommentComponent,MovieSliderComponent, ReactiveFormsModule,RouterModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
  
})
export class MovieDetailComponent {


  movieDetails: any = {};
  recommendedMovies: any[] = [];
  movieComments: any[] = [];

  numberOfComments : number=0;

    checkoutForm = this.formBuilder.group({
      comment: '',
    })
  
  userInfo: UserInfoReponse = {
    firstName: '',
    lastName: '',
    email :'',

  };

  
  route: ActivatedRoute = inject(ActivatedRoute);
  movieId = 0;

  constructor(private apiService: ApiService,private formBuilder: FormBuilder,private authService: AuthService, private router: Router) {

    this.movieId = Number(this.route.snapshot.params['id']);
  }
  ngOnInit() {

     this.authService.getUserInfo().subscribe(
      (data: UserInfoReponse) => {
        // Handle successful response here
        this.userInfo = data;
        console.log('User Info:', this.userInfo);
      },
      (error) => {
        // Handle error response here
        console.error('Error fetching user info:', error);
      }
    );


    this.route.params.subscribe(params => {
      this.movieId = params['id'];
    });
  this.apiService.getMovieDetails(this.movieId).subscribe(
    (data) => {
      this.movieDetails = {
          name: data.title,
          thumbnail: `https://image.tmdb.org/t/p/w780${data.backdrop_path}`,
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
    
    
     this.apiService.getRecommendedMovies(this.movieId).subscribe(
    (data) => {
      this.recommendedMovies = data.results.map((movie: any) => ({
        name: movie.title,
        thumbnail: `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`,
        id : movie.id,
      }));
    },
    (error) => {
      console.error("Error fetching action movies", error);
    }
     );
    
    
     this.apiService.getCommentMovie(this.movieId).subscribe(
    (data) => {
      this.movieComments = data.map((comment: any) => ({
        firstName: comment.firstName,
        lastName:comment.lastName,
        email: comment.email,
        comment : comment.comment,
      }));
         
         this.numberOfComments = this.movieComments.length;
    },
    (error) => {
      console.error("Error fetching action movies", error);
    }
  );
  }



  onSubmit(): void {
     
  


    const formData = { ...this.checkoutForm.value , movieId:0,firstName:"",lastName:"",email:""};
    formData.movieId = this.movieId;
    formData.firstName = this.userInfo.firstName;
    formData.lastName = this.userInfo.lastName;
    formData.email= this.userInfo.email;

    console.log(formData);


    this.apiService.addNewSpringMovie(formData).subscribe(
      response => {
        console.log("post request successful", response);
        this.checkoutForm.reset();
      },
      error => {
        console.error("Error in post request", error);
      }
    );   
   }
  onInputFocus() {
    if (!this.authService.isLoggedIn()) {
      setTimeout(() => {
                this.router.navigate(['/login']); // Adjust the route as needed
            }, 700);
     }
  }
  




  addFavoriteMovie() {
    if (this.authService.isLoggedIn()) {
      const favoriteData = {
        id: {
          email: this.userInfo.email,
          movieId: this.movieId
        }
      };
      this.apiService.addFavoriteMovie(favoriteData).subscribe(
        response => {
          console.log('Favorite movie added successfully:', response);
        },
        error => {
          console.error('Error adding favorite movie:', error);
        }
      );
    } else {
      setTimeout(() => {
                this.router.navigate(['/login']); // Adjust the route as needed
            }, 700);
      console.log('User is not logged in. Please log in to add favorites.');
    }
  }
}
