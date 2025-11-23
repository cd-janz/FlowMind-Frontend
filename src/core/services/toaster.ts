import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import IToaster from '@core/types/IToaster';

@Injectable({ providedIn: 'root' })
export default class ToasterService {
  private readonly _queue = new BehaviorSubject<Map<string, IToaster>>(new Map());
  private readonly _toaster = new BehaviorSubject<IToaster | null>(null);
  public readonly toaster$ = this._toaster.asObservable();

  add(toaster: IToaster): void {
    const queue = this._queue.getValue();
    const active = this._toaster.getValue();
    if (!active && queue.size === 0) {
      this._toaster.next(toaster);
      return;
    }
    if (queue.has(toaster.code) || active?.code === toaster.code) return;
    queue.set(toaster.code, toaster);
    this._queue.next(new Map(queue));
  }
  next(): void {
    const queue = [...this._queue.getValue().entries()];
    if (queue.length === 0) {
      this._toaster.next(null);
      return;
    }
    const [, nextToaster] = queue[0];
    const newQueue = new Map(queue.slice(1));
    this._queue.next(newQueue);
    this._toaster.next(nextToaster);
  }
}
