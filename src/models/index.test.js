import index from './index';

test('测试普通函数', () => {
  // .not 测试相反的匹配，可以和下面的匹配器结合使用

  // toBe 测试完全相等，使用 === 来测试

  // toBeCloseTo 比较浮点数相等

  // toEqual 测试对象是否匹配，递归检查对象或数组的每个字段

  // toBeNull 只匹配 null
  // toBeUndefined 只匹配 undefined
  // toBeDefined 与 toBeUndefined 相反
  // toBeTruthy 匹配任何 if 语句为真
  // toBeFalsy 匹配任何 if 语句为假

  // 比较数字
  // toBeGreaterThan 大于
  // toBeGreaterThanOrEqual 大于或等于
  // toBeLessThan 小于
  // toBeLessThanOrEqual 小于或等于

  // toMatch 匹配正则表达式的字符串

  // toContain 检查数组是否包含特定子项

  // toThrow 测试函数抛出的错误

  // 更多匹配器 http://facebook.github.io/jest/docs/expect.html

  expect(index.reducers.fetcherror({ abc: 1 }, { type: 'aaa' })).toEqual({ abc: 1 });
});
