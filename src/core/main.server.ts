import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './layouts/app';
import { config } from './configs/app.config.server';

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(App, config, context);

export default bootstrap;
