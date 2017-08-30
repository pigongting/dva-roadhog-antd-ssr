import { fetch } from './index';

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

test('测试异步-方法2-Promises-失败', () => {
  expect.assertions(1);
  return fetch({ type: 'index/fetch' }, {}, {}).catch(e => expect(e).toMatch('error'));
});

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
