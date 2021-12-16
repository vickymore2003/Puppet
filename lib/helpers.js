module.exports = {
    click: async function (page, selector) {
        try {
            await page.waitForSelector(selector)
            await page.click(selector)
        } catch (error) {
            throw new Error('Could not click on sector : ${ selector }')
        }
    },

    getText: async function (page, selector) {
        try {
            await page.waitForSelector(selector)
            return await page.$eval(selector, element => element.innerHTML)
        } catch (error) {
            throw new Error('Cannot get text of element : ${selector}')
        }
    },

    getCount: async function (page, selector) {
        try {
            await page.waitForSelector(selector)
            return await page.$$eval(selector, element => element.length)
        } catch (error) {
            throw new error('Cannot get count of selector : ${selector}')
        }
    },

    typeText: async function (page, selector) {
        try {
            await page.waitForSelector(selector)
            await page.type(selector, text)
        } catch (error) {
            throw new error('cannot type into selector : ${selector}')
        }
    },

    waitForText: async function (page, selector, text) {
        try {
            await page.waitForSelector(selector)
            await page.waitForFunction((selector, text) => {
                document.querySelector(selector).innerText.includes(text),
                    {},
                    selector,
                    text
            })
        } catch (error) {
            throw new error('Text : $(text) not found for selector : ${selector}')
        }
    },

    shouldNotExist: async function (page, selector) {
        try {
            await page.waitForSelector(selector, { hidden: true })
        } catch (error) {
            throw new error('selector : ${selector} is visible, but should not be present')
        }
    },
}