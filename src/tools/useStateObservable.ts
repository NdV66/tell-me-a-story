import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

//TODO: tests
export const useStateObservable = <T>(observable: Observable<T>, initialValue?: T) => {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    observable.subscribe(setData);
  }, [observable]);

  return data;
};
