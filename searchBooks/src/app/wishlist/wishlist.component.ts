import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../interfaces/book';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  wishlist: Book[] = [];

  constructor(private service: BookService) {}

  ngOnInit() {
    this.wishlist = this.service.getWishlist();
  }
}
