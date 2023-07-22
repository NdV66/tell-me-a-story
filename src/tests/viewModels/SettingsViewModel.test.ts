import { LIGHT_THEME, TRANSLATIONS_EN, TRANSLATIONS_PL } from 'data';
import { ISettingsModel } from 'models';
import { TestScheduler } from 'rxjs/testing';
import { getTestScheduler } from 'tests/helpers';
import { getSettingsModelMock } from 'tests/mocks';
import { EAppLangs, EAppTheme } from 'types';
import { SettingsViewModel } from 'viewModels';

describe('SettingsViewModel', () => {
  let viewModel: SettingsViewModel;
  let testScheduler: TestScheduler;
  let settingsModelMock: ISettingsModel;

  beforeEach(() => {
    settingsModelMock = getSettingsModelMock();
    viewModel = new SettingsViewModel(settingsModelMock);
    testScheduler = getTestScheduler();
  });

  test('Should set default values on enter', () => {
    viewModel = new SettingsViewModel(settingsModelMock);

    testScheduler.run(({ expectObservable }) => {
      expectObservable(viewModel.appLang$).toBe('a', { a: settingsModelMock.lang });
      expectObservable(viewModel.translations$).toBe('a', { a: settingsModelMock.translations });
      expectObservable(viewModel.appTheme$).toBe('a', { a: settingsModelMock.appTheme });
      expectObservable(viewModel.theme$).toBe('a', { a: settingsModelMock.theme });
    });
  });

  test('_syncWithModel()', () => {
    const lang = EAppLangs.EN;
    const appTheme = EAppTheme.LIGHT;

    testScheduler.run(({ cold, expectObservable }) => {
      expectObservable(viewModel.appLang$).toBe('ab', { a: settingsModelMock.lang, b: lang });
      expectObservable(viewModel.appTheme$).toBe('ab', {
        a: settingsModelMock.appTheme,
        b: appTheme,
      });

      cold('-b').subscribe(() => {
        settingsModelMock.appTheme = appTheme;
        settingsModelMock.lang = lang;
        viewModel['_syncWithModel']();
      });
    });
  });

  test('_subscribeToLang$()', () => {
    const lang = EAppLangs.EN;
    const translations = TRANSLATIONS_EN;

    testScheduler.run(({ cold, expectObservable }) => {
      expectObservable(viewModel.appLang$).toBe('ab', { a: settingsModelMock.lang, b: lang });
      expectObservable(viewModel.translations$).toBe('ab', {
        a: settingsModelMock.translations,
        b: translations,
      });

      cold('-b').subscribe(() => {
        settingsModelMock.translations = translations;
        viewModel['_appLang$'].next(lang);
        expect(settingsModelMock.lang).toBe(lang);
      });
    });
  });

  test('_subscribeToAppTheme$()', () => {
    const appTheme = EAppTheme.LIGHT;
    const theme = LIGHT_THEME;

    testScheduler.run(({ cold, expectObservable }) => {
      expectObservable(viewModel.appTheme$).toBe('ab', {
        a: settingsModelMock.appTheme,
        b: appTheme,
      });
      expectObservable(viewModel.theme$).toBe('ab', {
        a: settingsModelMock.theme,
        b: theme,
      });

      cold('-b').subscribe(() => {
        settingsModelMock.theme = theme;
        viewModel['_appTheme$'].next(appTheme);
        expect(settingsModelMock.appTheme).toBe(appTheme);
      });
    });
  });

  test('Should change lang', () => {
    const lang = EAppLangs.EN;

    testScheduler.run(({ cold, expectObservable }) => {
      expectObservable(viewModel.appLang$).toBe('ab', { a: settingsModelMock.lang, b: lang });

      cold('-b').subscribe(() => {
        viewModel.changeLang(lang);
      });
    });
  });

  test('Should change appTheme', () => {
    const appTheme = EAppTheme.LIGHT;

    testScheduler.run(({ cold, expectObservable }) => {
      expectObservable(viewModel.appTheme$).toBe('ab', {
        a: settingsModelMock.appTheme,
        b: appTheme,
      });

      cold('-b').subscribe(() => {
        viewModel.changeAppTheme(appTheme);
      });
    });
  });

  test('Should setup from cookies', () => {
    const syncWithModelMock = jest.fn();
    viewModel['_syncWithModel'] = syncWithModelMock;

    viewModel.setupFromCookies();
    expect(syncWithModelMock).toHaveBeenCalledTimes(1);
  });

  test('_buildLangName()', () => {
    const lang = 'PL';
    const translations = TRANSLATIONS_PL;
    const getTranslationsByLangMock = jest.fn().mockReturnValue(translations);
    settingsModelMock.getTranslationsByLang = getTranslationsByLangMock;

    const result = viewModel['_buildLangName'](lang);

    expect(result).toBe(translations.lang);
    expect(getTranslationsByLangMock).toHaveBeenCalledTimes(1);
    expect(getTranslationsByLangMock).toHaveBeenCalledWith(EAppLangs[lang]);
  });

  test('Should get available translations', () => {
    const expectedResult = [
      { key: EAppLangs.PL, value: TRANSLATIONS_PL.lang },
      { key: EAppLangs.EN, value: TRANSLATIONS_EN.lang },
    ];
    const buildLangNameMock = jest
      .fn()
      .mockReturnValueOnce(TRANSLATIONS_PL.lang)
      .mockReturnValueOnce(TRANSLATIONS_EN.lang);

    viewModel['_buildLangName'] = buildLangNameMock;

    expect(viewModel.availableTranslations).toEqual(expectedResult);
  });
});
