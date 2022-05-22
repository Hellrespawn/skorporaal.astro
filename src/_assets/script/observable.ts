export type Subscriber<T> = (value: T) => void;

export class Observable<T> {
  protected subscribers: Subscriber<T>[] = [];

  public subscribe(subscriber: Subscriber<T>) {
    this.subscribers.push(subscriber);
  }

  protected broadcast(value: T): void {
    this.subscribers.forEach((subscriber) => subscriber(value));
  }
}

export class Subject<T> extends Observable<T> {
  constructor(private value: T) {
    super();
  }

  public subscribe(subscriber: Subscriber<T>) {
    this.subscribers.push(subscriber);
    subscriber(this.value);
  }

  public next(value: T): void {
    this.value = value;
    this.broadcast(value);
  }

  public getValue(): T {
    return this.value;
  }
}
