import { TestScheduler } from 'rxjs/testing';

export const getTestScheduler = (showLogs = false) =>
  new TestScheduler((actual, expected) => {
    showLogs && console.log(actual, expected);
    expect(actual).toEqual(expected);
  });
