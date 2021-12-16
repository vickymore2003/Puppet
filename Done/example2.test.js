const puppeteer = require('puppeteer')

describe('Test02', () => {
	it('Verify text check box and drop down elements', async function () {
		const browser = await puppeteer.launch({
			headless: true,
			slowMo: 10,
			defaultViewport: null,
			args: ['--start-maximized'],
		})
		const page = await browser.newPage()
		await page.goto('https://devexpress.github.io/testcafe/example/')
		await page.type('#developer-name', 'Sunny', { delay: 100 })
		await page.click('#tried-test-cafe', { clickCount: 1 })
		await page.select('#preferred-interface', 'Both')
		const message = 'This is a message'
		await page.type('#comments', message)
		await page.click('#submit-button')
		await page.waitForSelector('.result-content')
		await page.waitForTimeout(5000)
		await browser.close()
	})
})
