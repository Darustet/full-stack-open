import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { vi } from 'vitest'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  // Gets reset after each test,
  // so toHaveLength() doesn't count calls in previous tests
  const updateBlog = vi.fn()

  beforeEach(() => {
    const blog = {
      title: 'Blog for your sprog',
      author: 'Anon',
      url: 'www.sproggerino.com',
      likes: 2,
      user: {
        name: 'User',
      },
    }

    render(<Blog blog={blog} updateBlog={updateBlog} />)
  })

  afterEach(() => {
    updateBlog.mockReset()
  })

  test('renders blog', () => {
    const title = screen.getByText('Blog for your sprog', { exact: false })
    expect(title).toBeVisible()

    const author = screen.getByText('Anon', { exact: false })
    expect(author).toBeVisible()

    const likes = screen.getByText('likes', { exact: false })
    expect(likes).not.toBeVisible()

    const url = screen.getByText('www.sproggerino.com')
    expect(url).not.toBeVisible()
  })

  test('Button to turn visible works', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('www.sproggerino.com')
    expect(url).toBeVisible()

    const likes = screen.getByText(2, { exact: false })
    expect(likes).toBeVisible()
  })

  test('Clicking \'like\' button twice', async () => {
    const user = userEvent.setup()
    const buttonView = screen.getByText('view')
    const buttonLike = screen.getByText('like')
    await user.click(buttonView)

    await user.click(buttonLike)
    await user.click(buttonLike)

    //console.log(updateBlog.mock.calls)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })

  test('<BlogForm /> calls handler with right details', async () => {
    const addBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={addBlog} />)

    const inputTitle = screen.getByLabelText('title:')
    const inputAuthor = screen.getByLabelText('author:')
    const inputUrl = screen.getByLabelText('url:')
    const createButton = screen.getByText('create')

    await user.type(inputTitle, 'New title')
    await user.type(inputAuthor, 'New author')
    await user.type(inputUrl, 'www.url.com')
    await user.click(createButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('New title')
    expect(addBlog.mock.calls[0][0].author).toBe('New author')
    expect(addBlog.mock.calls[0][0].url).toBe('www.url.com')
  })
})
