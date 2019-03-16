import { pipe } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

/** Select data from observable. */
export function select<T, T0>(selector: (state: T) => T0) {
  return pipe(
    map(selector),
    shareReplay(1)
  );
}
