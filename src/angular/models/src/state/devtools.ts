import { Injectable } from "@angular/core";

/**
 * Helper utility to connect to Redux Devtools.
 */
@Injectable({ providedIn: "root" })
export class DevTools {
  private readonly tools?: any;

  get connected(): boolean {
    return this.tools !== undefined;
  }

  constructor() {
    const ext = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
    this.tools = ext && ext.connect();
    if (this.connected) {
      this.tools.init({});
    }
  }

  send(action: string, state: any) {
    this.connected && this.tools.send(action, state);
  }
}
