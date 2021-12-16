const puppeteer = require('puppeteer')

describe('Test01', () => {
    it('should launch the browser', async function () {
        const browser = await puppeteer.launch({ 
            headless: true, 
            slowMo: 250 
        })
        const page = await browser.newPage()
        await page.goto('http://www.example.com')
        // console.log("waiting for 3 secs")
        // await page.waitForTimeout(3000)
        await page.waitForSelector('h1')
        // console.log("reloading the page")
        // await page.reload()
        // console.log("waiting for 3 secs")
        // await page.waitForTimeout(3000)
        // await page.waitForSelector('h1')

        await page.goto('https://dev.to/')
        await page.waitForSelector('.site-logo')
        await page.goBack()
        await page.waitForSelector('h1')
        await page.goForward()
        await page.waitForSelector('.site-logo')
        await browser.close()
    })
})