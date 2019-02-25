import { GlobalState } from './global_state';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

/**
 * The local model state for a single data model. Is indexed
 * on a key in the global state.
 */
export class ModelState<T> {
    constructor(private readonly state: GlobalState, private readonly key: string) { }

    push(state: T, action?: string) {
        this.state.push(this.key, state, action);
    }

    select<TResult>(selector: (state: T) => TResult): Observable<TResult> {
        return this.state.select(this.key).pipe(map(selector), distinctUntilChanged());
    }

    getState(): T {
        return this.state.getState(this.key);
    }
}