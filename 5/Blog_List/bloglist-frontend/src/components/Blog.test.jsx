import React from 'react';
import '@testing-library/jest-dom'; // Correct import for jest-dom
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';


const blog = {
    id: '1',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0,
};

test('renders title and author, but not url or likes by default', () => {

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent('Test Blog');
  expect(component.container).toHaveTextContent('Test Author');
  expect(component.container).not.toHaveTextContent('http://testurl.com');
  expect(component.container).not.toHaveTextContent('likes');
});

test('renders url and likes when the button controlling the shown details has been clicked', () => {
  const component = render(<Blog blog={blog}  />);

  const button = component.getByText('view');
  fireEvent.click(button);

  expect(component.container).toHaveTextContent('http://testurl.com');
  expect(component.container).toHaveTextContent('0 likes');
});

test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {


  const component = render(<Blog blog={blog}  />);

  const viewButton = component.getByText('view');
  fireEvent.click(viewButton);

  const likeButton = component.getByText('like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
