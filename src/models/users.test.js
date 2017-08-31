import users from './users.js';

/*
 * 模拟功能使得测试代码之间的链接变得容易，使用的方法是：擦除函数的实际功能
 * 怎么样擦除函数的实际功能？
 * 1. 捕获对该函数的调用（以及在这些调用中传递的参数）
 * 2. 在使用 new 进行实例化的时候，捕获构造函数的实例
 * 3. 允许对返回值配置 test-time 选项
**/

/*
 * 有两种方式使用模拟功能：
 * 1. 创建一个模拟函数
 * 2. 编写一个手动模拟来覆盖模块依赖关系
**/

/* 1. 创建一个模拟函数
 * .mock 属性
 *    所有的模拟函数都有这个特殊的 .mock 属性
 *    1>  它会保存模拟函数的调用数据，模拟函数被调用后，mock 属性会保存类似这样的数据:
 *        { calls: [ [ 0 ], [ 1 ] ], instances: [ undefined, undefined ] }
 *        calls 保存的是传递进来过的参数
 *        instances 保存的是模拟函数的实例（通过 new 或 bind 创建的）
 *
 *    2>  它也会跟踪每次调用 this 的值，使得检查 this 成为可能???
 *
 * 模拟返回值
 *    1> 测试过程中也可以使用模拟函数将测试值注入到代码中
 *    2> 模拟函数在连续传递风格的函数中也非常有用
 *       以这种风格编写的代码有助于避免需要复杂的存根（复杂的存根：重新创建他们所处的真实组件的行为）
 *       有利于在使用之前将值直接注入测试
 *    3> 大多数现实世界的例子实际上涉及到依赖组件的模拟函数，并且需要进行配置，但技术是一样的
 *       在这些情况下，尽量避免在不直接测试的任何函数中实现逻辑的诱惑
 *
 * 模拟实现
 * 然而，有些情况下超越指定返回值的功能是有用的，并且全面替换了模拟函数的实现
 * 这可以通过 jest.fn 或 mock 函数上 mockImplementationOnce 方法完成
 *
 * 自定义匹配器
 *
 *
 *
**/
test('创建一个模拟函数', () => {
  const MockCallback = jest.fn();

  // 2. 在使用 new 进行实例化的时候，捕获构造函数的实例
  const a = new MockCallback();
  const b = {};
  const bound = MockCallback.bind(b);
  bound();
  console.log(MockCallback.mock);

  // 1. 捕获对该函数的调用（以及在这些调用中传递的参数）
  users.reducers.forEach([0, 1], MockCallback);
  console.log(MockCallback.mock);

  // The mock function is called twice
  expect(MockCallback.mock.calls.length).toBe(4);

  // The first argument of the first call to the function was 0
  // expect(MockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  // expect(MockCallback.mock.calls[1][0]).toBe(1);

  // The second arg of the first call to the function was 'second arg'
  // expect(MockCallback.mock.calls[0][1]).toBe('second arg');

  // This function was instantiated exactly twice
  // expect(MockCallback.mock.instances.length).toBe(2);

  // The object returned by the first instantiation of this function
  // had a `name` property whose value was set to 'test'
  // expect(MockCallback.mock.instances[0].name).toEqual('test');

  // 模拟返回值
  // 1. 测试过程中也可以使用模拟函数将测试值注入到代码中
  const myMock = jest.fn();
  console.log(myMock());
  // > undefined

  myMock.mockReturnValueOnce(10)
   .mockReturnValueOnce('x')
   .mockReturnValue(true);

  console.log(myMock(), myMock(), myMock(), myMock());
  // > 10, 'x', true, true

  // 2. 模拟函数在连续传递风格的函数中也非常有用
  const filterTestFn = jest.fn();

  // Make the mock return `true` for the first call,
  // and `false` for the second call
  filterTestFn
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false);

  const result = [11, 12].filter(filterTestFn);

  console.log(result);
  // > [11]
  console.log(filterTestFn.mock.calls);
  // > [ [11], [12] ]

  // 模拟实现
  const myMockFn = jest.fn(cb => cb(null, true));

  myMockFn((err, val) => console.log(val));
  // > true

  myMockFn((err, val) => console.log(val));
  // > true

  // 当你需要定义模拟函数的默认实现（从另一个模块创建的）时 mockImplementation 方法很有用
  // foo.js
  module.exports = function() {
    // some implementation;
  };

  // test.js
  jest.mock('../foo'); // this happens automatically with automocking
  const foo = require('../foo');

  // foo is a mock function
  foo.mockImplementation(() => 42);
  foo();
  // > 42

  // 当您需要重新创建模拟函数的复杂行为，以便多个函数调用产生不同的结果时，请使用 mockImplementationOnce 方法：
  const myMockFn = jest.fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

  myMockFn((err, val) => console.log(val));
  // > true

  myMockFn((err, val) => console.log(val));
  // > false

  // 当 mocked函数用完了由 mockImplementationOnce 定义的实现时，它将执行使用 jest.fn（如果被定义）的默认实现集：
  const myMockFn = jest.fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

  console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
  // > 'first call', 'second call', 'default', 'default'

  // 对于我们有些总是需要返回的方法的情况（通常是链式的），我们有一个语法糖 API .mockReturnThis() 函数的形式来简化，它也位于所有模拟函数上：
  const myObj = {
    myMethod: jest.fn().mockReturnThis(),
  };

  // is the same as

  const otherObj = {
    myMethod: jest.fn(function() {
      return this;
    }),
  };

  // 最后，为了能够简单的去断言 mock 函数是怎么样被调用的，我们为您添加了一些自定义匹配器函数：
  // The mock function was called at least once
  expect(mockFunc).toBeCalled();

  // The mock function was called at least once with the specified args
  expect(mockFunc).toBeCalledWith(arg1, arg2);

  // The last call to the mock function was called with the specified args
  expect(mockFunc).lastCalledWith(arg1, arg2);

  // 这些匹配器实际上只是用于检查 .mock 属性的语法糖。你也可以自己手动做（如果这更符合你的口味），或者你需要做更具体的事情
  // The mock function was called at least once
  expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

  // The mock function was called at least once with the specified args
  expect(mockFunc.mock.calls).toContain([arg1, arg2]);

  // The last call to the mock function was called with the specified args
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual(
    [arg1, arg2]
  );

  // The first arg of the last call to the mock function was `42`
  // (note that there is no sugar helper for this specific of an assertion)
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

  // 更多匹配器 http://facebook.github.io/jest/docs/expect.html

});
