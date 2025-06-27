import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// esto copiado de la pagina de primeng (linea 3 a 6)
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // esto copiado de la pagina de primeng (linea 15 a 21)
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })

  ]
};
