import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest'; // Correct import for jest-dom
import { render, fireEvent, screen } from '@testing-library/react';
import Blog from './Blog';
import BlogForm from './BlogForm';
import blogService from '../services/blogs';

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

vi.mock('../services/blogs');

test('calls addBlog with the right details when a new blog is created', async () => {
  const mockAddBlog = vi.fn(); // Mock the addBlog function
  const user = userEvent.setup();

  // Mock the create function in blogService to return the expected blog object
  const newBlog = {
    author: 'Test Author',
    title: 'Test Title',
    url: 'http://testurl.com',
    likes: '5',
  };

  blogService.create.mockResolvedValue(newBlog);

  render(<BlogForm addBlog={mockAddBlog} />);

  // Simulate user input for the form fields
  const authorInput = screen.getByPlaceholderText('Author');
  const titleInput = screen.getByPlaceholderText('Title');
  const urlInput = screen.getByPlaceholderText('URL');
  const likesInput = screen.getByPlaceholderText('Likes');

  const sendButton = screen.getByText('save');

  await user.type(authorInput, 'Test Author');
  await user.type(titleInput, 'Test Title');
  await user.type(urlInput, 'http://testurl.com');
  await user.type(likesInput, '5');

  // Simulate form submission
  await user.click(sendButton);

  // Check that addBlog was called once with the correct data
  expect(mockAddBlog.mock.calls).toHaveLength(1);

  // Check the first call to mockAddBlog
  expect(mockAddBlog.mock.calls[0][0]).toEqual(newBlog);
});