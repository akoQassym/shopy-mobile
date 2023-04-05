import { useEffect } from 'react';
import EventEmitter from '../EventEmitter';

const useEventListener = (event, listener, deps) => {
  useEffect(() => {
    EventEmitter.addListener(event, listener);
    return () => {
      EventEmitter.removeListener(event, listener);
    };
  }, deps);
};

export const makeEventNotifier = (name) => {
  return {
    name: name,
    notify: (param) => {
      EventEmitter.notify(name, param);
    },
    useEventListener: (listener, deps) =>
      useEventListener(name, listener, deps),
  };
};
