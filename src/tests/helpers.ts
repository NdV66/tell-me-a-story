import { TestScheduler } from 'rxjs/testing';

export const getTestScheduler = () =>
  new TestScheduler((actual, expected) => {
    console.log(actual, expected);

    expect(actual).toEqual(expected);
  });
