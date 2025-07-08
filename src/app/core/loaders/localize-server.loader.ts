
import { LocalizeParser, LocalizeRouterSettings } from '@gilsdav/ngx-translate-router';
import { Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LocalizeRouterHttpLoader } from '@gilsdav/ngx-translate-router-http-loader';
import { Inject, StateKey, TransferState, makeStateKey, PLATFORM_ID, Injector } from '@angular/core';
import { join } from 'path';
import * as fs from 'fs';

export class LocalizeServerLoader extends LocalizeParser {
  isLoaded: boolean = false;

  constructor(
    translateService: TranslateService,
    location: Location,
    settings: LocalizeRouterSettings,
    private transferState: TransferState,
    private platformId: any,
  ) {
    super(translateService, location, settings);
  }

  public load(routes: Routes): Promise<any> {
    if (this.isLoaded) {
      return Promise.resolve();
    } else {
      this.isLoaded = true;
    }

    return new Promise((resolve: any) => {
      const assetsFolder = join(
        process.cwd(),
        '.',
        'dist',
        'ask-aladdin',
        'browser',
        'assets',
        'locales.json',
      );
      const data: any = JSON.parse(fs.readFileSync(assetsFolder, 'utf8'));

      const key: StateKey<number> = makeStateKey<number>('transfer-locales');
      this.transferState.set(key, data);

      this.locales = data.locales;
      this.prefix = data.prefix;

      if (isPlatformBrowser(this.platformId)) {
        this.init(routes).then(resolve);
      } else {
        resolve();
      }
    });
  }
}

export function localizeServerLoaderFactory(
  translate: TranslateService,
  location: Location,
  settings: LocalizeRouterSettings,
  httpClient: HttpClient,
  transferState: TransferState,
  injector: Injector
): LocalizeParser {
  const key: StateKey<number> = makeStateKey<number>(
    'transfer-locales',
  );
  const platformId = injector.get(PLATFORM_ID);

  const data = transferState.get(key, null);
  if (data) {
    return new LocalizeServerLoader(translate, location, settings, transferState, platformId);
  } else {
    return new LocalizeRouterHttpLoader(
      translate,
      location,
      settings,
      httpClient,
    );
  }
}
