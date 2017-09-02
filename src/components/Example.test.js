import React from 'react';
import renderer from 'react-test-renderer';
import Example from './Example';

test('renders correctly', () => {
  debugger;
  const tree = renderer.create(<Example>abc</Example>).toJSON();
  expect(tree).toMatchSnapshot();
});
