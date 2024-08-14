const { test, expect, beforeEach, describe } = require('@playwright/test');
const { get, request } = require('http');


// Function to create a user via API (assuming your backend supports it)
const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').first().fill(username)
    await page.getByTestId('password').last().fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}
  

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Navigate to the main page
    await request.post('http://localhost:5173/api/users', {
        data: {
          username: 'Henryk',
          password: 'smokojebca'
        }
      })
    await page.goto('http://localhost:5173')

  });

  test('login form can be opened', async ({ page }) => {
    // Check that the login button is visible
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();

  });

  test('successful login', async ({ page }) => {
    // Open the login form

    // Fill in the username and password
    loginWith(page, 'Henryk', 'smokojebca')
    await expect(page.getByText('Welcome Henryk')).toBeVisible()
  });

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'Henryk', 'wrong')

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    }) 

    test('login fails with wrong username', async ({ page }) => {
        await loginWith(page, 'wrong', 'smokojebca')
    
        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('Wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

        })
})

describe('when logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/users', {
        data: {
          username: 'Henryk',
          password: 'smokojebca'
        }
    })
    await page.goto('http://localhost:5173')
    await loginWith(page, 'Henryk', 'smokojebca')

  })
  test('a new blog can be created', async ({ page }) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill('My new blog')
    await page.getByTestId('author').fill('Me')
    await page.getByTestId('url').fill('https://example.com')
    await page.getByTestId('likes').fill(8)
    await page.getByRole('button', { name: 'save' }).click()
    await expect(page.getByText('My new blog')).toBeVisible()
  })
})
