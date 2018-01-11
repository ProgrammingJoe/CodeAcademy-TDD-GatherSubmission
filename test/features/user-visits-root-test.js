const {assert} = require('chai');

describe('User visits root', () => {
  describe('without existing items', () => {
    it('starts blank', () => {
      browser.url('/');
      assert.equal(browser.getText('#items-container'), '');
    });
  });

  describe('User navigates to create.html', () => {
    it('User can navigate to create.html', () => {
      browser.url('/');
      browser.click('a[href="/items/create"]');

      assert.equal(browser.getText('.create-container'), 'Create');
    });
  });
});
