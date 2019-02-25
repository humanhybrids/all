import { InjectionToken, FactoryProvider } from '@angular/core';
import { ModelState } from './model_state';
import { GlobalState } from './global_state';
import { StateFactory } from './state_factory';

export class ModelToken<T> extends InjectionToken<T> {
    constructor(readonly key: string, readonly initialState: T) { super(key); }
}

export class ModelStateProvider<T> implements FactoryProvider {
    provide = this.token;
    useFactory = (factory: StateFactory) =>
        factory.createModelState(this.token.key, this.token.initialState);
    deps = [StateFactory];

    constructor(private readonly token: ModelToken<T>) { }
}
