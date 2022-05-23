export interface Observer<T> {
  update(value: T): void;
}

export interface Observable<T> {
  subscribe(observer: Observer<T>): void;
}

export class Subject<T> implements Observable<T> {
  protected subscribers: Observer<T>[] = [];

  constructor(private value: T) {}

  subscribe(subscriber: Observer<T>) {
    this.subscribers.push(subscriber);
    subscriber.update(this.value);
  }

  protected broadcast(value: T): void {
    this.subscribers.forEach((subscriber) => subscriber.update(value));
  }

  next(value: T): void {
    this.value = value;
    this.broadcast(value);
  }

  getValue(): T {
    return this.value;
  }
}
