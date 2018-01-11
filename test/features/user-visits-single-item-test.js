const {assert} = require('chai');

describe('Single item', () => {
  describe('description', () => {
    it('should render on the page', () => {
      const title = 'Not a bear';
      const description = 'Maybe a bear';
      const imageUrl = 'https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg';

      browser.url('/items/create');
      browser.setValue('input[id=title-input]', title);
      browser.setValue('textarea[id=description-input]', description);
      browser.setValue('input[id=imageUrl-input]', imageUrl);
      browser.click('input[type=submit]');
      browser.url('/');
      browser.click('.item-card a');

      assert.include(browser.getText('body'), description);
    });
  });
});
