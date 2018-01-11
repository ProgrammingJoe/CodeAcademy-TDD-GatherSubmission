const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('GET', () => {
    it('renders empty input fields', async () => {
      const response = await request(app)
        .get('/items/create');

      assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
    });
  });

  describe('POST', (req, res, next) => {
    it('posts a new item and creates it in the database', async () => {
      const newitem = buildItemObject();

      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(newitem);
      const createdItem = await Item.findOne(newitem);

      assert.isOk(createdItem, 'Item was not created successfully in the database');
    });

    it('posts a new item and creates it in the database', async () => {
      const newitem = buildItemObject();

      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(newitem);

      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });

    it('should display an error message that title is required', async () => {
      const newitem = {
        title: null,
        description: 'A description for something without a title',
        imageUrl: 'http://placebear.com/g/200/300'
      };

      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(newitem);

      const allItems = await Item.find({});

      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });

    it('should display an error message that description is required', async () => {
      const newitem = {
        title: 'A description for something without a title',
        imageUrl: 'http://placebear.com/g/200/300'
      };

      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(newitem);

      const items = await Item.find({});

      assert.equal(items.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });

    it('should display an error message that title is required', async () => {
      const newitem = {
        description: 'A description for something without a title',
        title: 'bear'
      };

      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(newitem);

      const items = await Item.find({});

      assert.equal(items.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
  });

});
