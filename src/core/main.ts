import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './configs/app.config';
import { App } from './layouts/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
