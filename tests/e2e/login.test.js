const puppeteer = require('puppeteer')

describe('Login Test', () => {
    let browser, page

    before(async function () {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 5,
            devtools: false
        })

        page = await browser.newPage()
        await page.setDefaultTimeout(15000)
        await page.setDefaultNavigationTimeout(20000)
    })

    after(async function () {
        await browser.close()
    })

    it('Login test - Invalid details', async function () {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')

        await page.waitForSelector('#login_form')
        await page.type('#user_login', 'invalid')
        await page.type('#user_password', 'InavalidPass')
        await page.click('#user_remember_me')
        await page.click('input[type = "submit"]')
        await page.waitForSelector('.alert-error')
    })

    it('Login test - valid details', async function () {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')

        await page.waitForSelector('#login_form')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('#user_remember_me')
        await page.click('input[type = "submit"]')
        await page.waitForSelector('button#details-button')
        await page.click('button#details-button')
        await page.waitForSelector('#proceed-link')
        await page.click('#proceed-link')
        await page.waitForSelector('#settingsBox')
    })
})