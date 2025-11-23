import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import LoaderComponent from '@core/components/Loader';
import ToasterComponent from '@core/components/Toaster';

@Component({
  selector: 'fm-root',
  imports: [RouterOutlet, LoaderComponent, ToasterComponent],
  template: `
    <fm-toaster />
    <fm-loader />
    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('FlowMind');
}
