import Cookies from 'js-cookie';
import { CookiesManager } from 'models';
jest.mock('js-cookie');

describe('CookiesManager', () => {
  let manager: CookiesManager;

  beforeEach(() => {
    manager = new CookiesManager();
  });

  test('Should set app theme', () => {});
});
