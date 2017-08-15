import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './worldapp.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
