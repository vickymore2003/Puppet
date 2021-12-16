const puppeteer = require('puppeteer')
const expect = require('chai').expect

const { click ,getText,getCount,shouldNotExist} = require('../lib/helpers')
describe('Test02', () => {
    let browser, page

    before(async function () {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 10,
            defaultViewport: null,
            args: ['--start-maximized'],
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    })

    after(async function () {
        await browser.close()
    })

    it('Verify the URL,get text ,count of element,assert and timeout', async function () {
        await page.goto('http://example.com/')
        const title = await page.title()
        const url = await page.url()
        const text = await getText(page, 'h1')
        const count = await getCount(page, 'p')
        expect(title).to.be.a('String', 'Example Domain')
        expect(url).to.include('example.com')
        expect(text).to.be.a('String', 'Example Domain')
        expect(count).to.equal(2)

        await page.goto('http://zero.webappsecurity.com/index.html')
        await click(page, '#signin_button')
        await page.waitFor(2000)
        await shouldNotExist(page, '#signin_button')
    })
})
