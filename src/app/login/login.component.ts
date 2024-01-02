import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../authentification.service';
import { Router, RouterLink,RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import { AuthenticationRequest } from '../authentification.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    errorMessage: string = ''; 


checkoutForm: FormGroup = this.formBuilder.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
}) as FormGroup & {
  value: {
    email: string;
    password: string;
  };
};
  credentials: AuthenticationRequest = {
    email: '',
    password : '',
  };



    constructor(private formBuilder: FormBuilder,private authService: AuthService, private router: Router) { }
  login(): void {
    this.credentials = this.checkoutForm.value;
    console.log(this.credentials);
  this.authService.authenticate(this.credentials).subscribe(
    response => {
      console.log('Authentication successful:', response);
      this.router.navigate(['']);
    },
    error => {
      this.errorMessage = 'Invalid email or password. '; 
      console.error('Authentication failed:', error);
    }
  );
    
   
}

 onFocus() {
      this.errorMessage = '';
    }

}
