const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:
describe('User submits a new post', () => {
  describe('User submits a new post \n', () => {
    it('User can submit a new post', async () => {
      const title = 'Not a bear';
      const description = 'Maybe a bear';
      const imageUrl = 'https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg';

      browser.url('/items/create');
      browser.setValue('input[id=title-input]', title);
      browser.setValue('textarea[id=description-input]', description);
      browser.setValue('input[id=imageUrl-input]', imageUrl);
      browser.click('input[type=submit]');

      assert.include(browser.getText('body'), title);
      assert.equal(browser.getAttribute('body img.item-img', 'src'), imageUrl);
    });
  });
});
