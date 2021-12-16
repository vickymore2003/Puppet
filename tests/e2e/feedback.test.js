const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe(' Feedback test', () => {
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


    it('display feedback form', async function () {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#feedback')
        await page.click('#feedback')
    })
    it('Submit feedback form', async function () {
        await page.waitForSelector('form')
        await page.type('#name','Name')
        await page.type('#email','abc@xyz.com')
        await page.type('#subject','This is feedback 01')
        await page.type('#comment','This is feed back comment 01')
        await page.click('input[type="submit"]')
    })
    it('show feedback form', async function () {
        await page.waitForSelector('#feedback-title')
        const url = await page.url()
        expect(url).to.include('/sendFeedback.html')
    })
})
