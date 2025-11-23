import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import ToasterService from '@core/services/toaster';
import {AsyncPipe} from '@angular/common';
import InfoIcon from '@core/assets/icon/InfoIcon';
import {toSignal} from '@angular/core/rxjs-interop';
import IToaster from '@core/types/IToaster';
import {Subscription} from 'rxjs';

@Component({
  selector: "fm-toaster",
  templateUrl: "../templates/toaster.html",
  imports: [InfoIcon],
  styleUrl: "../styles/toaster.scss"
})
export default class ToasterComponent implements OnInit, OnDestroy {
  toaster = signal<IToaster | null>(null);
  private sub?: Subscription;
  private timeoutId?: any;
  constructor(private readonly toasterService: ToasterService) {}
  ngOnInit(): void {
    this.sub = this.toasterService.toaster$.subscribe(toaster => {
      if (!toaster) {
        this.toaster.set(null);
        return;
      }
      this.toaster.set(toaster);
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.toasterService.next();
      }, 3000);
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }
}
