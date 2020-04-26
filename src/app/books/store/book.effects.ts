import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { Book } from '../book';
import { BookService } from '../book.service';
import * as bookActions from './book.actions';

@Injectable()
export class BookEffects {

  loadBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.loadBooks),
      switchMap(() =>
        this.bookService.findAll().pipe(
          map((data: Array<Book>) => bookActions.loadBooksSuccess({ data })),
          catchError((error: any) => of(bookActions.loadBooksFail({ error })))
        )
      )
    )
  );

  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.createBook),
      switchMap((action: any) =>
        this.bookService.create(action.payload).pipe(
          map((payload: Book) => bookActions.createBookSuccess({ payload })),
          catchError((error: any) => of(bookActions.createBookFail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ) {}
}