import { Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { GlobalState } from "./global_state";

/**
 * The local model state for a single data model. Is indexed
 * on a key in the global state.
 */
export class ModelState<T> {
  constructor(
    private readonly state: GlobalState,
    private readonly key: string
  ) {}

  push(reducer: (prevState: T) => T, action?: string) {
    const nextState = reducer(this.state.getState(this.key));
    this.state.push(this.key, nextState, action);
  }

  pushNext<T0>(
    observable: Observable<T0>,
    reducer: (prevState: T, observableResult: T0) => T,
    action?: string
  ) {
    observable.subscribe(result => {
      const nextState = reducer(this.state.getState(this.key), result);
      this.state.push(this.key, nextState, action);
    });
  }

  select<TResult>(selector: (state: T) => TResult): Observable<TResult> {
    return this.state.select(this.key).pipe(
      map(selector),
      distinctUntilChanged()
    );
  }
}
