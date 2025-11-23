import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export default class LoaderService {
    private readonly _activeCount = new BehaviorSubject<number>(0);
    private readonly _active = new BehaviorSubject<boolean>(false);
    public readonly active$ = this._active.asObservable();
    subscribeToLoader() {
        if (this._activeCount.getValue() === 0) this._active.next(true);
        this._activeCount.next(this._activeCount.getValue() + 1);
    }
    removeLoaderSubscription() {
        if (this._activeCount.getValue() === 1 && this._active.getValue()) this._active.next(false);
        this._activeCount.next(this._activeCount.getValue() - 1);
    }
}
