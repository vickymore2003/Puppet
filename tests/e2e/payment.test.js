const puppeteer = require('puppeteer')

describe(' Payment test', () => {
    before(async function () {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 5,
            devtools: false
        })

        page = await browser.newPage()
        await page.setDefaultTimeout(15000)
        await page.setDefaultNavigationTimeout(20000)
        await page.goto('http://zero.webappsecurity.com/login.html')
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

    after(async function () {
        await browser.close()
    })

    it('Display payment form', async function () {
        await page.waitForSelector('.nav-tabs')
        await page.click('#pay_bills_tab')
        await page.waitForSelector('.board')
        })

    it('Make payment form', async function () {
        await page.select('#sp_payee','Apple')
        await page.select('#sp_account','Credit Card')
        await page.type('#sp_amount','500')
        await page.type('#sp_date','2020-04-05')
        await page.keyboard.press('Enter')
        await page.type('#sp_description','Payment for rent')
        await page.click('#pay_saved_payees')
        
        await page.waitForSelector('#alert_content')
    })
})