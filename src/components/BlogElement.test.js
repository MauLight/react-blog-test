import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { BlogElement } from './blogElement'

test('renders content', () => {
  const blog = {
    title: '10 reasons why waiting for food sucks ass',
    author: 'Chi-Pi',
    url: 'www.chipi.com',
    likes: 10,
    user: {
      username: 'Elv'
    }
  }

  render(<BlogElement elem={blog} />)
  const element = screen.getByText('10 reasons why waiting for food sucks ass', { exact: false })
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug(element)
  expect(element).toBeDefined()
})

test('clicking the button calls the event handler', async () => {

  const blog = {
    title: '10 reasons why waiting for food sucks ass',
    author: 'Chi-Pi',
    url: 'www.chipi.com',
    likes: 10,
    user: {
      username: 'Elv'
    }
  }

  const mockHandler = jest.fn()

  render(<BlogElement elem={blog} handleDelete={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('Delete')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

})

test('renders title and author by default, but not url and likes', () => {

  const blog = {
    title: '10 reasons why waiting for food sucks ass',
    author: 'Chi-Pi',
    url: 'www.chipi.com',
    likes: 10,
    user: {
      username: 'Elv'
    }
  }

  //render(<BlogElement elem={blog} handleDelete={mockHandler} />)
  const { container } = render(<BlogElement elem={blog} />)

  const title = screen.getByText('10 reasons why waiting for food sucks ass', { exact: false })
  const author = screen.getByText('Chi-Pi', { exact: false })
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const urlAndLiesDiv = container.querySelector('.togglableContent')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(urlAndLiesDiv).toHaveStyle('display: none')
})

test('renders url and likes when button is pressed', async () => {

  const blog = {
    title: '10 reasons why waiting for food sucks ass',
    author: 'Chi-Pi',
    url: 'www.chipi.com',
    likes: 10,
    user: {
      username: 'Elv'
    }
  }

  const { container } = render(<BlogElement elem={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const urlAndLiesDiv = container.querySelector('.togglableContent')
  expect(urlAndLiesDiv).toHaveStyle('display: block')
})

test('hit the button twice calls eventHandler twice', async () => {

  const blog = {
    title: '10 reasons why waiting for food sucks ass',
    author: 'Chi-Pi',
    url: 'www.chipi.com',
    likes: 10,
    user: {
      username: 'Elv'
    }
  }

  const mockHandler = jest.fn()
  render(<BlogElement elem={blog} handleLikes={mockHandler} />)
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  const likeButton = screen.getByText('like')
  await user.click(viewButton)
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})