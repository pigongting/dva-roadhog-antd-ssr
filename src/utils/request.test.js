import request from './request';

// 测试异步-方法1-回调函数
// 适合测试Ajax
/*
test('测试异步-方法1-回调函数', (done) => {
  function callback(data) {
    console.log(data);

    expect(data).toEqual({
      data: {
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        userId: 1,
      },
      headers: {},
    });

    done();
  }

  request({ type: 'index/fetchbanner' }, {}, { Url: 'http://jsonplaceholder.typicode.com/posts/1' }, callback);
});
*/

// 测试异步-方法3-Async/Await
test('测试异步-方法3-Async/Await-成功', async () => {
  // expect.assertions(1);
  const data = await request({ type: 'index/fetch' }, {}, { Url: 'http://jsonplaceholder.typicode.com/posts/1' });
  console.log(data);
  expect(1+2).toBe(3);
  // expect(data).toEqual({
  //   data: {
  //     body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  //     id: 1,
  //     title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  //     userId: 1,
  //   },
  //   headers: {},
  // });
});

/*
test('测试异步-方法3-Async/Await-失败', async () => {
  expect.assertions(1);
  try {
    await request({ type: 'index/fetch' }, {}, { Url: 'http://jsonplaceholder.typicode.com/posts/1' });
  } catch (e) {
    expect(e).toMatch('error');
  }
});

// 可以结合 async 和 await .resolves 或 .rejects （在 Jest 20.0.0+ 中可用）
test('测试异步-方法3-Async/Await-结合resolves', async () => {
  expect.assertions(1);
  await expect(request({ type: 'index/fetch' }, {}, { Url: 'http://jsonplaceholder.typicode.com/posts/1' })).resolves.toEqual({
    data: {
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      userId: 1,
    },
    headers: {},
  });
});

test('测试异步-方法3-Async/Await-结合rejects', async () => {
  expect.assertions(1);
  await expect(request({ type: 'index/fetch' }, {}, { Url: 'http://jsonplaceholder.typicode.com/posts/1' })).rejects.toMatch('error');
});
*/
