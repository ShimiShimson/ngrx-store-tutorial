import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GoogleBooksService } from './book-list/books.service';
import { selectBooks } from './state/book.selectors';
import { selectBookCollection } from './state/book.selectors';
import { retrievedBookList } from './state/books.actions';
import { removeBook } from './state/books.actions';
import { addBook } from './state/books.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  books$ = this.store.pipe(select(selectBooks));
  booksCollection$ = this.store.pipe(select(selectBookCollection));

  onAdd(bookId) {
    this.store.dispatch(addBook({ bookId }));
  }

   onRemove(bookId) {
    this.store.dispatch(removeBook({ bookId }));
  }

  constructor(
    private booksService: GoogleBooksService,
    private store: Store
  ) {}

  ngOnInit() {
    this.booksService
      .getBooks()
      .subscribe((Book) => 
this.store.dispatch(retrievedBookList({ Book })));
  }
}

