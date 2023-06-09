import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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

  screen.debug()

  const element = screen.getByText('Sofia')
  expect(element).toBeVisible()

  expect(screen.getByText('url test')).not.toBeVisible()
})