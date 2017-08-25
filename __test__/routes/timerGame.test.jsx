'use strict';

jest.useFakeTimers();

it('calls the callback after 1 second via runTimersToTime', () => {
  const timerGame = require('../../src/routes/timerGame');
  const callback = jest.fn();

  timerGame(callback);

  // At this point in time, the callback should not have been called yet
  expect(callback).not.toBeCalled();

  // Fast-forward until all timers have been executed
  jest.runTimersToTime(1000000);

  // Now our callback should have been called!
  expect(callback).toBeCalled();
  expect(callback.mock.calls.length).toBe(1);
});
