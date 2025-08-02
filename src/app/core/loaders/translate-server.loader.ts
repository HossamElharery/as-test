import { join } from 'path';
import { Observable, of } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';
import * as fs from 'fs';
import { StateKey, TransferState, makeStateKey, Injectable, Optional } from '@angular/core';

@Injectable()
export class TranslateServerLoader implements TranslateLoader {
  private prefix: string = 'i18n';
  private suffix: string = '.json';

  constructor(
    @Optional() private transferState?: TransferState
  ) {}

  public getTranslation(lang: string): Observable<any> {
    return new Observable((observer) => {
      try {
        const assets_folder = join(
          process.cwd(),
          'dist',
          'ask-aladdin', // Your project name here
          'browser',
          'assets',
          this.prefix
        );

        const filePath = `${assets_folder}/${lang}${this.suffix}`;

        // Check if file exists before reading
        if (!fs.existsSync(filePath)) {
          console.warn(`Translation file not found: ${filePath}, using fallback`);
          observer.next({});
          observer.complete();
          return;
        }

        const jsonData = JSON.parse(
          fs.readFileSync(filePath, 'utf8')
        );

        // Only save to transfer state if it's available
        if (this.transferState) {
          const key: StateKey<number> = makeStateKey<number>(
            'transfer-translate-' + lang
          );
          this.transferState.set(key, jsonData);
        }

        observer.next(jsonData);
        observer.complete();
      } catch (error) {
        console.error(`Error loading translation for ${lang}:`, error);
        // Return empty object as fallback
        observer.next({});
        observer.complete();
      }
    });
  }
}

export function translateServerLoaderFactory(transferState: TransferState) {
  return new TranslateServerLoader(transferState);
}
