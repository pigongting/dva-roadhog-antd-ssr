import request from './request';

// 测试异步-方法1
test('测试异步', (done) => {
  function callback(data) {
    console.log(data);

    expect(data).toEqual({
      "data": {
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "userId": 1
      },
      "headers": {}
    });

    done();
  }

  request({ type: 'index/fetch' }, {}, { Url: 'http://jsonplaceholder.typicode.com/posts/1' }, callback);
});
