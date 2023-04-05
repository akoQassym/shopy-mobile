const listenersMap = {};

const addListener = (eventName, listener) => {
  listenersMap[eventName] = listenersMap[eventName] || [];
  listenersMap[eventName].push(listener);
};

const removeListener = (eventName, listener) => {
  let lis = listenersMap[eventName];
  if (!lis) return;

  for (let i = lis.length - 1; i >= 0; i--) {
    if (lis[i] === listener) {
      lis.splice(i, 1);
      break;
    }
  }
};

const removeAllListeners = (eventName) => {
  listenersMap[eventName] = [];
};

const notify = (eventName, ...params) => {
  let listeners = listenersMap[eventName];
  if (!listeners) return false;
  listeners.forEach((fnc) => {
    fnc(...params);
  });
  return true;
};

export default {
  addListener,
  removeListener,
  removeAllListeners,
  notify,
};
