const puppeteer = require('puppeteer')
const expect = require('chai').expect
describe('Test02', () => {
	let browser
	let page

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

	beforeEach(async function () {
		//runs before each IT
	})
	afterEach(async function () {
		//runs after each IT
	})
	it('Verify the URL,get text ,count of element,assert and timeout', async function () {
		await page.goto('http://example.com/')
		const title = await page.title()
		const url = await page.url()
		console.log('Title is ' + title)
		console.log('URL is ' + url)
		const text = await page.$eval('h1', element => element.textContent)
		console.log('Text in H1 is : ' + text)
		const count = await page.$$eval('p', element => element.length)
		console.log('there are ' + count + ' p elements present on page')

		expect(title).to.be.a('String', 'Example Domain')
		expect(url).to.include('example.com')
		expect(text).to.be.a('String', 'Example Domain')
		expect(count).to.equal(2)


		await page.goto('http://zero.webappsecurity.com/index.html')
		await page.waitForSelector('#searchTerm')
		await page.type('#searchTerm', 'Hello World')
		await page.keyboard.press('Enter', { delay: 10 })
		await page.waitForXPath('//h2')
		const search = await page.$eval('h2', element => element.textContent)
		expect(search).to.be.contain('Search Results:', 'Search')
		await page.waitForSelector('#signin_button')
		await page.click('#signin_button')
		//await page.waitForSelector(()=>!document.querySelector('#signin_button'))
		await page.waitForSelector('#signin_button', {
			hidden: true,
			timeout: 3000
		})
	})
})
