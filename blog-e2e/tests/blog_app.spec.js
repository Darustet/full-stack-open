const { test, expect, beforeEach, afterEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
const { create } = require('domain')
const { request } = require('http')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Tester',
        username: 'test',
        password: 'password'
        }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test', 'password')
      await expect(page.getByText('Tester logged in ')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page}) => {
      await loginWith(page, 'test', 'wrong')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Tester logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'password')
    })

    afterEach(async ({ page, request }) => {
      await request.post('/api/testing/reset/blogs')
      await page.getByLabel('button', { name: 'view'}).count(0)
    })
    
    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'Was the soviet onion the best in the world?',
        'Philomena Cunk',
        'http://ofonionandmen.so'
      )
      await expect(page.getByText('Was the soviet onion the best in the world? Philomena Cunk')).toBeVisible({ timeout: 10000})
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          'Was the soviet onion the best in the world?',
          'Philomena Cunk',
          'http://ofonionandmen.so'
        )
      })

      test('user can like a blog', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        const likeButton = page.getByRole('button', { name: 'like' })

        await likeButton.click()
        await expect(page.getByText('likes: 1')).toBeVisible({ timeout: 30000})
      })

      test('user can delete a blog', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('Was the soviet onion the best in the world? Philomena Cunk')).not.toBeVisible()
      })

      test('oncy blog owner can delete a blog', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            name: 'Another User',
            username: 'another',
            password: 'password'
          }
        })

        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'another', 'password')

        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })

      test('blogs are ordered according to likes', async ({ page }) => {
        // Create second blog
        await createBlog(
          page,
          'Second blog',
          'Bloggy McBlogface',
          'http://blog.blog'
        )

        const secondBlog = page.getByText('Second blog Bloggy McBlogface')
        await secondBlog.getByRole('button', { name: 'view' }).click()
        const secondBlogLikeButton = secondBlog.getByRole('button', { name: 'like' })

        await secondBlogLikeButton.click()
        await secondBlog.getByText('likes: 1').waitFor() // wait for like to register

        const blogs = page.getByTestId('blog', { timeout: 10000 })
        await expect(blogs.nth(0).locator('text="Second blog Bloggy McBlogface"')).toBeVisible()
        await expect(blogs.nth(1).locator('text="Was the soviet onion the best in the world? Philomena Cunk"')).toBeVisible()
      })
    })
  })
})