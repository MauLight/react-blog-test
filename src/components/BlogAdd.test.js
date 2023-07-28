import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogAdd from './BlogAdd'
import userEvent from '@testing-library/user-event'

test('<BlogAdd /> calls eventHandler with the right parameters', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogAdd createBlog={createBlog} />)
  //   const { container } = render(<BlogAdd createBlog={createBlog} />)

  //   const input1 = container.querySelector('#title')
  //   const input2 = container.querySelector('#author')
  //   const input3 = container.querySelector('#url')

  //const input = screen.getAllByRole('textbox')
  const input1 = screen.getByPlaceholderText('title')
  const input2 = screen.getByPlaceholderText('author')
  const input3 = screen.getByPlaceholderText('url')
  //   const input4 = screen.getAllByRole('textbox')[3]
  const sendButton = screen.getByText('Add Blog')

  await user.type(input1, 'testing a form...')
  await user.type(input2, 'testing a form...')
  await user.type(input3, 'testing a form...')
  //   await user.type(input4, 0)
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
  expect(createBlog.mock.calls[0][0].author).toBe('testing a form...')
  expect(createBlog.mock.calls[0][0].url).toBe('testing a form...')
})