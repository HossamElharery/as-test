export interface ILanguageService {
  initializeLanguage(): void;
  switchLanguage(lang: string): void;
  getCurrentLang(): string;
}
