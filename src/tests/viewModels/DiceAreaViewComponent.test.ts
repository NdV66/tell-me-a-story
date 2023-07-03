import { TestScheduler } from 'rxjs/testing';
import { getTestScheduler } from 'tests/helpers';
import { storyTellerMock } from 'tests/mocks';
import { EStoryCategory } from 'types';
import { DiceAreaViewComponent } from 'viewModels';

describe('DiceAreaViewComponent', () => {
  let viewModel: DiceAreaViewComponent;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = getTestScheduler();
    viewModel = new DiceAreaViewComponent(storyTellerMock);
  });

  test('Should update _currentDice$/currentDice$', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const marble = 'a-b';
      const a = ['icon1', 'icon2'];
      const b = ['icon3', 'icon4', 'icon5'];
      const prepareFakeValues = jest.fn().mockReturnValueOnce(a).mockReturnValueOnce(b);

      cold(marble).subscribe(() => {
        viewModel['_currentDice$'].next(prepareFakeValues());
      });

      expectObservable(viewModel.currentDice$).toBe(marble, { a, b });
    });
  });

  test('Should tell a story', () => {
    const categories = [EStoryCategory.BOTTLES, EStoryCategory.CREATURES];
    const amount = 6;
    const expectedIcons = ['icon3', 'icon4', 'icon5'];

    const tellAStoryMock = jest.fn().mockReturnValue(expectedIcons);
    storyTellerMock.tellAStory = tellAStoryMock;

    testScheduler.run(({ expectObservable }) => {
      viewModel.tellAStory(categories, amount);

      expect(tellAStoryMock).toHaveBeenCalledTimes(1);
      expect(tellAStoryMock).toHaveBeenCalledWith(categories, amount);
      expectObservable(viewModel.currentDice$).toBe('a', { a: expectedIcons });
    });
  });
});
