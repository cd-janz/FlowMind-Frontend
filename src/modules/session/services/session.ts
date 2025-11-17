import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Views } from "../types/session";

@Injectable({ providedIn: "root" })
export default class SessionService {
  private readonly _view$ = new BehaviorSubject<Views>("login");
  readonly view$: Observable<Views> = this._view$.asObservable();
  changeView(view: Views) {
    this._view$.next(view);
  }
}
