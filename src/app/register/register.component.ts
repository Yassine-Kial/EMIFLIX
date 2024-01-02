import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../authentification.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import { RegisterRequest } from '../authentification.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  checkoutForm: FormGroup = this.formBuilder.group({
  firstName: ['', [Validators.required]],
  lastName: ['', [Validators.required]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
}) as FormGroup & {
  value: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
    };
  
  credentials: RegisterRequest = {
    firstName: '',
    lastName:'',
    email: '',
    password : '',
  };
    constructor(private formBuilder: FormBuilder,private authService: AuthService, private router: Router) { }
  register(): void {
    this.credentials = this.checkoutForm.value; // Fix the typo here
    console.log(this.credentials);
  this.authService.register(this.credentials).subscribe(
    response => {
      console.log('Authentication successful:', response);
      this.router.navigate(['login']);
    },
    error => {
      console.error('Authentication failed:', error);
    }
  );
}
}
