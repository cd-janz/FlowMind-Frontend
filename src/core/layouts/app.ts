import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'fm-root',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('FlowMind');
}
