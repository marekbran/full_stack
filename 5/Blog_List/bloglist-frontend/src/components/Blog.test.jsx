import React from 'react';
import '@testing-library/jest-dom/vitest'; // Correct import for jest-dom
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import BlogForm from './BlogForm';

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
  const component = render(<Blog blog={blog} />);

  const button = component.getByText('view');
  fireEvent.click(button);

  expect(component.container).toHaveTextContent('http://testurl.com');
  expect(component.container).toHaveTextContent('0 likes');
});

test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
  const mockHandler = vi.fn(); // Define the mock function

  const component = render(<Blog blog={blog} onLike={mockHandler} />);

  const viewButton = component.getByText('view');
  fireEvent.click(viewButton);

  const likeButton = component.getByText('like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test('calls addBlog with the right details when a new blog is created', async () => {
  const mockAddBlog = vi.fn(); // Mock the addBlog function

  const component = render(<BlogForm addBlog={mockAddBlog} />);

  // Simulate user input for the form fields
  const authorInput = component.getByLabelText('author');
  const titleInput = component.getByLabelText('title');
  const urlInput = component.getByLabelText('url');
  const likesInput = component.getByLabelText('likes');

  fireEvent.change(authorInput, { target: { value: 'Test Author' } });
  fireEvent.change(titleInput, { target: { value: 'Test Title' } });
  fireEvent.change(urlInput, { target: { value: 'http://testurl.com' } });
  fireEvent.change(likesInput, { target: { value: '5' } });

  // Simulate form submission
  const form = component.container.querySelector('form');
  fireEvent.submit(form);

  // Check that addBlog was called once with the correct data
  expect(mockAddBlog).toHaveBeenCalledTimes(1);
  expect(mockAddBlog).toHaveBeenCalledWith({
    author: 'Test Author',
    title: 'Test Title',
    url: 'http://testurl.com',
    likes: '5',
  });
});
