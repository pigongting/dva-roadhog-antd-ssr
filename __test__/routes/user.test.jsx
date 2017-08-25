jest.mock('../../src/routes/request');

import * as user from '../../src/routes/user';

//断言必须返回一个primose
it('works with promises', async () => {
  expect.assertions(1);
  return expect(user.getUserName(3)).rejects.toEqual({
    error: 'User with 3 not found.',
  });
});
