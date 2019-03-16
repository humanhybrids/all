import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DevTools } from "./devtools";
import { map } from "rxjs/operators";

interface State<T> {
  readonly state: Observable<T>;
  push(reducer: (prevState: T) => T, type?: string): void;
  getState(): T;
  getScope(key: keyof T): State<T[keyof T]>;
}

class LocalState<P, K extends keyof P, T extends P[K]> implements State<T> {
  readonly state = this.parent.state.pipe(map(state => state[this.key] as T));

  constructor(
    private readonly key: keyof P,
    private readonly parent: State<P>
  ) {}

  getState() {
    return this.parent.getState()[this.key] as T;
  }

  push(reducer: (prevState: T) => T, type: string = "push"): void {
    const nextState = reducer(this.parent.getState()[this.key] as T);
    this.parent.push(
      prevState => Object.assign({}, prevState, { [this.key]: nextState }),
      `${this.key}.${type}`
    );
  }

  getScope(key: keyof T): LocalState<T, keyof T, T[keyof T]> {
    return new LocalState(key, this);
  }
}

@Injectable({ providedIn: "root" })
export class GlobalState<T> implements State<T> {
  readonly state = new BehaviorSubject<T>({} as T);

  constructor(private readonly devtools: DevTools) {}

  push(reducer: (prevState: T) => T, type: string = "push") {
    const nextState = reducer(this.state.value);
    this.state.next(nextState);
    this.devtools.send(type, nextState);
  }

  getState() {
    return this.state.value;
  }

  getScope(key: keyof T): LocalState<T, keyof T, T[keyof T]> {
    return new LocalState(key, this);
  }
}
