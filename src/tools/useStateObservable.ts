import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

//TODO: tests
export const useStateObservable = <T>(observable: Observable<T>, initialValue?: T) => {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    const result = observable.subscribe(setData);
    return () => result.unsubscribe();
  }, [observable]);

  return data;
};
