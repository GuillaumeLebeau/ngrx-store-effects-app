import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as toppingsAction from '../actions/toppings.action';
import * as fromServices from '../../services';

@Injectable()
export class ToppingsEffects {
  constructor(private actions$: Actions, private toppingService: fromServices.ToppingsService) {}

  @Effect()
  loadToppings$ = this.actions$.ofType(toppingsAction.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingService
        .getToppings()
        .pipe(
          map(toppings => new toppingsAction.LoadToppingsSuccess(toppings)),
          catchError(error => of(new toppingsAction.LoadToppingsFail(error))),
        );
    }),
  );
}
