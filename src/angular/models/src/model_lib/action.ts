import { Observable } from "rxjs";
import { first } from "rxjs/operators";

/**
 * Actions that return observables will be subscribed to automatically.
 */
export function Action(): MethodDecorator {
  return (
    ctor: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const action = descriptor.value;
    descriptor.value = function<T>() {
      const observable = action.apply(this, arguments);
      if (observable instanceof Observable) {
        const subscription = observable.subscribe({
          complete: () => subscription.unsubscribe()
        });
      }
      return observable;
    };
  };
}
