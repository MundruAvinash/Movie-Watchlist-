//Debouncing delays a function until a certain amount of time has passed without another call.
export function debounce<T extends (...args: any[]) => void>(
  fn: T,//the function we want to delay
  delay: number//the waiting time in milliseconds
): (...args: Parameters<T>) => void {//Parameters<T> extracts the parameter types from function type T.
    //...args collects the arguments passed to the returned function.
    //=> void means the returned function doesn't promise a meaningful return value.
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}