import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../interfaces/book';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
  private wishlist: Book[] = [];

  constructor(private http: HttpClient) {}

  fetchBooks(query: string): Observable<Book[]> {
    console.log(`constructed url: ${this.apiUrl}${query}`);
    return this.http
      .get<{ items: Book[] }>(`${this.apiUrl}${query}`)
      .pipe(map((data) => data.items));
  }

  getWishlist() {
    return this.wishlist;
  }

  addBook(book: Book) {
    if (!this.wishlist.find((b) => b.id === book.id)) {
      this.wishlist.push(book);
    }
  }

  removeBook(book: Book) {
    this.wishlist = this.wishlist.filter((b) => b != book);
  }
}
