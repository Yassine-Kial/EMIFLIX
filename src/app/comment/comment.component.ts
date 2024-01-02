import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() firstName: string = "";
  @Input() lastName: string = "";
  @Input() commentaire: string = "";
  @Input() profileLetter: string = "";
  @Input() date: string = "";
  @Input() like: string = "";
}
