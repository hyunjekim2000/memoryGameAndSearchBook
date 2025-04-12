import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Book } from '../interfaces/book';
import { debounceTime } from 'rxjs';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, TruncatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  bookList: Book[] = [];
  wishList: Book[] = [];

  constructor(private fb: FormBuilder, private service: BookService) {}

  ngOnInit() {
    this.form = this.fb.group({
      query: [''],
    });

    this.wishList = this.service.getWishlist();

    this.form
      .get('query')
      ?.valueChanges.pipe(debounceTime(400))
      .subscribe((query: string) => {
        this.service.fetchBooks(query).subscribe((books) => {
          this.bookList = books;
        });
      });
  }

  addBook(book: Book) {
    this.service.addBook(book);
    this.wishList = this.service.getWishlist();
  }

  removeBook(book: Book) {
    this.service.removeBook(book);
    this.wishList = this.service.getWishlist();
  }
}
