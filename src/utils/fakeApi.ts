
export async function fakeApiCall<T>//Defines a reusable asynchronous function that can return different types of data.
//async means the function returns a Promise.
//export lets other files import this function.

(
  data: T,
  failureRate = 0.3,
  maxRetries = 3
)//data: T — the data to return if the API succeeds.
//failureRate = 0.3 — a 30% simulated failure chance by default.
//maxRetries = 3 — allows three retries after the initial attempt.
: Promise<T> {
  let attempts = 0;//This variable counts how many times the function has attempted the request.

  while (true) //This variable counts how many times the function has attempted the request.
    {
    attempts++;

    const delay = Math.floor(Math.random() * 2000) + 500;
//This generates a delay between 500 and 2,499 milliseconds.
// Math.random() generates a random number from 0 up to, but not including, 1.
// Multiplying by 2000 gives a range from 0 up to 2,000.
//Math.floor() rounds down to an integer.
//Adding 500 sets the minimum delay to 500 milliseconds.

    await new Promise<void>(resolve => setTimeout(resolve, delay));
//This waits for the specified delay without blocking the entire JavaScript runtime.
//new Promise<void>(...) creates a Promise that resolves without a value.
//setTimeout(...) schedules the resolution after the delay.
//await pauses this function until the Promise resolves.

    const failed = Math.random() < failureRate;
//This randomly determines whether the simulated API request fails.
//With failureRate = 0.3, each attempt has a 30% chance of failure.

    if (!failed) {//If the request succeeds, the function returns the supplied data and stops retrying.
      return data;
    }

    if (attempts > maxRetries) {//If the attempt count exceeds the retry limit, the function throws an error.
      throw new Error(`API failed after ${attempts} attempts`);
    }
  }
}
