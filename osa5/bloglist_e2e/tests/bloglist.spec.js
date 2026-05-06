const { test, expect, beforeEach, describe } =
require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Teemu Testaaja',
                username: 'Testaaja123',
                password: 'salasana'
            }
        })

        await page.goto('http://localhost:5173')
    })
    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('Log in to application')).toBeVisible()
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
    })
    describe('Login', () => {
        test('Login is successful with correct credentials', async ({ page }) => {
            await page.getByLabel('username').fill('Testaaja123')
            await page.getByLabel('password').fill('salasana')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('blogs')).toBeVisible()
            await expect(page.getByText('Teemu Testaaja logged in')).toBeVisible()
        })

        test('Login fails with incorrect credentials', async ({ page }) => {
            await page.getByLabel('username').fill('incorrect')
            await page.getByLabel('password').fill('incorrect')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.locator('.error')).toContainText('Incorrect username or password')
            await expect(page.locator('.error')).toHaveCSS('color', 'rgb(255, 0, 0)')
        })
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByLabel('username').fill('Testaaja123')
            await page.getByLabel('password').fill('salasana')
            await page.getByRole('button', { name: 'login' }).click() 
        })
        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'create new blog' }).click()
            await page.getByLabel('title').fill('Uusi blogi')
            await page.getByLabel('author').fill('Erkki Esimerkki')
            await page.getByLabel('url').fill('uusiblogi.fi')
            await page.getByRole('button', { name: 'create' }).click()

            await expect(page.locator('.success')).toContainText('A new blog Uusi blogi by Erkki Esimerkki added')
            await expect(page.getByText('Uusi blogi Erkki Esimerkki')).toBeVisible()
        })
        test('user can like blogs', async ({ page }) => {
            await page.getByRole('button', { name: 'create new blog' }).click()
            await page.getByLabel('title').fill('Uusi blogi')
            await page.getByLabel('author').fill('Erkki Esimerkki')
            await page.getByLabel('url').fill('uusiblogi.fi')
            await page.getByRole('button', { name: 'create' }).click()

            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()

            await expect(page.getByText('ikes: 1')).toBeVisible()
        })
        test('User can remove their own blogs', async ({ page }) => {
            await page.getByRole('button', { name: 'create new blog' }).click()
            await page.getByLabel('title').fill('Uusi blogi')
            await page.getByLabel('author').fill('Erkki Esimerkki')
            await page.getByLabel('url').fill('uusiblogi.fi')
            await page.getByRole('button', { name: 'create' }).click()

            await page.getByRole('button', { name: 'view' }).click()
            page.on('dialog', async dialog => {
                expect(dialog.message()).toContain('Do you want to remove Uusi blogi by Erkki Esimerkki')
                await dialog.accept()
            })
            await page.getByRole('button', { name: 'remove' }).click()

            await expect(page.getByText('Uusi blogi Erkki Esimerkki')).toHaveCount(0)
        })
        test('User can see remove button only if the blog was added by them', async ({ page, request }) => {
            await page.getByRole('button', { name: 'create new blog' }).click()
            await page.getByLabel('title').fill('Uusi blogi')
            await page.getByLabel('author').fill('Erkki Esimerkki')
            await page.getByLabel('url').fill('uusiblogi.fi')
            await page.getByRole('button', { name: 'create' }).click()
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
            await page.getByRole('button', { name: 'logout' }).click()

            await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Kimmo Koodari',
                username: 'Koodari1',
                password: 'salainen'
            }
            })
            await page.goto('http://localhost:5173')

            await page.getByLabel('username').fill('Koodari1')
            await page.getByLabel('password').fill('salainen')
            await page.getByRole('button', { name: 'login' }).click()

            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).toHaveCount(0)
        })
    })
    describe('When there is multiple blogs', () => {
        beforeEach(async ({ page }) => {
            await page.getByLabel('username').fill('Testaaja123')
            await page.getByLabel('password').fill('salasana')
            await page.getByRole('button', { name: 'login' }).click()

            await page.getByRole('button', { name: 'create new blog' }).click()
            await page.getByLabel('title').fill('Uusi blogi')
            await page.getByLabel('author').fill('Erkki Esimerkki')
            await page.getByLabel('url').fill('uusiblogi.fi')
            await page.getByRole('button', { name: 'create' }).click()

            await page.getByRole('button', { name: 'create new blog' }).click()
            await page.getByLabel('title').fill('Toinen blogi')
            await page.getByLabel('author').fill('Kimmo Koodari')
            await page.getByLabel('url').fill('blogi.fi')
            await page.getByRole('button', { name: 'create' }).click()
        })
        test('Blogs are listed in descending order of likes', async ({ page }) => {
            await page.locator('.blogStyle', { hasText: 'Uusi blogi' }).getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            await page.getByRole('button', { name: 'hide' }).click()

            await page.locator('.blogStyle', { hasText: 'Toinen blogi' }).getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            await page.getByRole('button', { name: 'hide' }).click()

            await page.locator('.blogStyle', { hasText: 'Uusi blogi' }).getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            await page.getByRole('button', { name: 'hide' }).click()

            await page.locator('.blogStyle', { hasText: 'Toinen blogi' }).getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'hide' }).click()

            await page.locator('.blogStyle', { hasText: 'Uusi blogi' }).getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'hide' }).click()

            await page.getByRole('button', { name: 'view' }).first().click()
            await expect(page.getByText('ikes: 2')).toBeVisible()
            await page.getByRole('button', { name: 'hide' }).click()

            await page.getByRole('button', { name: 'view' }).last().click()
            await expect(page.getByText('ikes: 1')).toBeVisible()

        })
    })
})