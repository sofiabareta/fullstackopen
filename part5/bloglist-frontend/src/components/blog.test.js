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

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)
  // screen.debug()
  expect(screen.getByText('url test')).toBeVisible()
})