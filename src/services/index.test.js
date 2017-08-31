import { fetch } from './index';

function initializeCityDatabase() {
  return fetch({ type: 'index/fetch' }, {}, {});
}

function clearCityDatabase() {
  return fetch({ type: 'index/fetch' }, {}, {});
}

// beforeEach 和 afterEach 可以像 test 能够支持异步代码一样的方法支持异步代码
// 方法是使用 done 参数或者返回一个 promise

// 每个测试前，初始化数据
beforeEach(() => {
  return initializeCityDatabase();
});

// 每个测试后，清除数据
afterEach(() => {
  return clearCityDatabase();
});

// 所有测试前，初始化数据
beforeAll(() => {
  return initializeCityDatabase();
});

// 所有测试后，清除数据
afterAll(() => {
  return clearCityDatabase();
});

// [beforeEach | afterEach | beforeAll | afterAll] 都接受 describe 作用域的控制
describe('matching cities to foods', () => {
  // 只在 describe block 中起作用
  beforeEach(() => {
    return initializeCityDatabase();
  });

  // 测试异步-方法2-Promises
  // return 是必须的，否则测试将在 fetch 完成之前完成
  test('测试异步-方法2-Promises-成功', () => {
    expect.assertions(1);
    return fetch({ type: 'index/fetch' }, {}, {}).then((data) => {
      expect(data).toEqual({
        data: {
          body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
          id: 1,
          title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
          userId: 1,
        },
        headers: {},
      });
    });
  });

  /*
  test('测试异步-方法2-Promises-失败', () => {
    expect.assertions(1);
    return fetch({ type: 'index/fetch' }, {}, {}).catch(e => expect(e).toMatch('error'));
  });
  */
});

/*
// 可以使用 .resolves / .rejects （在 Jest 20.0.0+ 中可用）
test('测试异步-方法2-Promises-结合resolves', () => {
  expect.assertions(1);
  return expect(fetch({ type: 'index/fetch' }, {}, {})).resolves.toEqual({
    data: {
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      userId: 1,
    },
    headers: {},
  });
});

test('测试异步-方法2-Promises-结合rejects', () => {
  expect.assertions(1);
  return expect(fetch({ type: 'index/fetch' }, {}, {})).rejects.toMatch('error');
});
*/
