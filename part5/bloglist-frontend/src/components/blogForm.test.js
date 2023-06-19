import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByLabelText('Title:', { selector: 'input' })
  const inputAuthor = screen.getByLabelText('Author:', { selector: 'input' })
  const inputUrl = screen.getByLabelText('URL:', { selector: 'input' })
  const sendButton = screen.getByText('Create')

  await user.type(inputTitle, 'Title')
  await user.type(inputAuthor, 'Author')
  await user.type(inputUrl, 'URL')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls[0][0])
  expect(createBlog.mock.calls[0][0].title).toBe('Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Author')
  expect(createBlog.mock.calls[0][0].url).toBe('URL')
})