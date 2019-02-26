import { BehaviorSubject, Observable } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";
import { Injectable } from "@angular/core";

/**
 * Helper utility to connect to Redux Devtools.
 */
class DevTools {
  private readonly tools?: any;

  get connected(): boolean {
    return this.tools !== undefined;
  }

  constructor(config?: any) {
    const ext = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
    this.tools = ext && ext.connect(config);
    if (this.connected) {
      this.tools.init({});
    }
  }

  send(action: string, state: any) {
    this.connected && this.tools.send(action, state);
  }
}

/**
 * The global state container for the application.
 */
@Injectable({ providedIn: "root" })
export class GlobalState {
  private readonly state = new BehaviorSubject<any>({});
  private readonly devTools = new DevTools();

  push(key: string, state: any, action: string = ""): void {
    this.state.next({ ...this.state.getValue(), [key]: state });
    this.devTools.send(`${key} [${action}]`, this.state.getValue());
  }

  select<TResult>(key: string): Observable<TResult> {
    return this.state.pipe(
      map(state => state[key] as TResult),
      distinctUntilChanged()
    );
  }

  getState<TResult>(key: string): TResult {
    return this.state.getValue()[key] as TResult;
  }
}
