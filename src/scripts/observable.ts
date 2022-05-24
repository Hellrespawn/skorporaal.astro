export interface Observer<T> {
  update(value: T): void;
}

export interface Observable<T> {
  subscribe(observer: Observer<T>): void;
}

export class Subject<T> implements Observable<T> {
  protected subscribers: Observer<T>[] = [];

  subscribe(subscriber: Observer<T>) {
    this.subscribers.push(subscriber);
  }

  protected publish(value: T): void {
    this.subscribers.forEach((subscriber) => subscriber.update(value));
  }

  protected next(value: T): void {
    this.publish(value);
  }
}

export class BehaviorSubject<T> extends Subject<T> {
  constructor(private value: T) {
    super();
  }

  subscribe(subscriber: Observer<T>) {
    super.subscribe(subscriber);
    subscriber.update(this.value);
  }

  protected next(value: T): void {
    super.next(value);
    this.value = value;
  }
}
