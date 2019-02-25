import { Injectable } from '@angular/core';
import { GlobalState } from './global_state';
import { ModelState } from './model_state';

/** Determines if key is a string. */
function isString(key: any): key is string {
    return key instanceof String;
}

/**
 * Creates instances of model state for data models.
 */
@Injectable({ providedIn: 'root' })
export class StateFactory {
    constructor(private readonly globalState: GlobalState) { }

    createModelState<T>(key: string | object, initialState: T): ModelState<T> {
        const keyString: string = isString(key) ? key : key.constructor.name;
        this.globalState.push(keyString, initialState, 'init');
        return new ModelState<T>(this.globalState, keyString);
    }
}
