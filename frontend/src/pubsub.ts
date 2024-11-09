type Callback<T> = (data: T) => void;

interface Subscribers {
  [event: string]: Array<Callback<any>>;
}

const subscribers: Subscribers = {};

export const subscribe = <T>(event: string | number, callback: Callback<T>) => {
  if (!subscribers[event]) {
    subscribers[event] = [];
  }
  subscribers[event].push(callback as Callback<any>);
};

export const unsubscribe = <T>(
  event: string | number,
  callback: Callback<T>
) => {
  if (!subscribers[event]) return;

  subscribers[event] = subscribers[event].filter(
    (subscriber) => subscriber !== callback
  );
};

export const publish = <T>(event: string | number, data: T) => {
  if (subscribers[event]) {
    (subscribers[event] as Array<Callback<T>>).forEach((callback) =>
      callback(data)
    );
  }
};
