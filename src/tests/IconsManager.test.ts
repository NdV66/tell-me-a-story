import { IIconsManager, IconsManager } from 'models';

const prefixIconMock = 'mock-';
const playersIconsMock = ['mock-icon'];

describe('IconsManager', () => {
  let manager: IIconsManager;

  beforeEach(() => {
    manager = new IconsManager(prefixIconMock, playersIconsMock);
  });

  test('Should return correct prefix', () => {
    expect(manager.iconPrefix).toBe(prefixIconMock);
  });
});
