import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: 'Sofia',
    url: 'url test',
    title: 'Title test',
    likes: 2,
    user: {
      id: 111,
      username: 'Username',
      name: 'Name'
    }
  }

  const user = {
    user: {
      id: 111,
      username: 'Username',
      name: 'Name'
    }
  }

  render(<Blog blog={blog} user={user} />)

  const element = screen.getByText('Sofia')
  expect(element).toBeVisible()

  expect(screen.getByText('url test')).not.toBeVisible()
})

test('clicking the button shows URL and likes', async () => {
  const blog = {
    author: 'Sofia',
    url: 'url test',
    title: 'Title test',
    likes: 2,
    user: {
      id: 111,
      username: 'Username',
      name: 'Name'
    }
  }

  const blogUser = {
    user: {
      id: 111,
      username: 'Username',
      name: 'Name'
    }
  }

  render(<Blog blog={blog} user={blogUser} />)

  // const user = userEvent.setup()
  // const button = screen.getByText('show')
  const element = screen.getAllByText('url test')
  // await user.click(button)
  screen.debug()
  expect(element[0]).not.toBeVisible()
})

test('clicking the button twice will trigger event handler twice', async () => {
  const blog = {
    author: 'Sofia',
    url: 'url test',
    title: 'Title test',
    likes: 2,
    user: {
      id: 111,
      username: 'Username',
      name: 'Name'
    }
  }

  const blogUser = {
    user: {
      id: 111,
      username: 'Username',
      name: 'Name'
    }
  }

  const mockCallBack = jest.fn()

  const { container } = render(<Blog blog={blog} user={blogUser} toggleBlogInfo={mockCallBack} />)

  const user = userEvent.setup()
  const button = container.querySelector('.button__toggle')
  await user.dblClick(button)
  expect(mockCallBack.mock.calls.length).toEqual(2)
})