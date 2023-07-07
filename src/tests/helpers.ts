import { TestScheduler } from 'rxjs/testing';

export const getTestScheduler = () =>
  new TestScheduler((actual, expected) => {
    // console.log(actual, expected);
    // for (const el of actual) {
    //   console.log('ACTUAL', el.notification.value);
    // }
    expect(actual).toEqual(expected);
  });
