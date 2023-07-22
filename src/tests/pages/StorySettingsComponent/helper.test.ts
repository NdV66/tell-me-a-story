import { prepareMarks } from 'pages/StorySettingsComponent/helper';

describe('Helper', () => {
  test('prepareMarks()', () => {
    const min = 1;
    const max = 5;
    const step = 2;
    const expectedResult = [
      { value: 1, label: 1 },
      { value: 3, label: 3 },
      { value: 5, label: 5 },
    ];

    const result = prepareMarks(min, max, step);

    expect(result).toEqual(expectedResult);
  });
});
