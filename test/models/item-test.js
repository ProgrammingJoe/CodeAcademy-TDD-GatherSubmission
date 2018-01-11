const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  // Write your tests below:
  describe('title', () => {
    it('should be a string', () => {
      const notAString = 1;

      const newitem = new Item({
        title: notAString
      });

      assert.strictEqual(newitem.title, notAString.toString());
    });

    it('should be required', () => {
      const newitem = new Item({});

      newitem.validateSync();
    });
  });

  describe('description', () => {
    it('should be a string', () => {
      const notAString = 1;

      const newitem = new Item({
        description: notAString
      });

      assert.strictEqual(newitem.description, notAString.toString());
    });

    it('should be required', () => {
      const newitem = new Item({});

      newitem.validateSync();
    });
  });

  describe('imageUrl', () => {
    it('should be a string', () => {
      const notAString = 1;

      const newitem = new Item({
        imageUrl: notAString
      });

      assert.strictEqual(newitem.imageUrl, notAString.toString());
    });

    it('should be required', () => {
      const newitem = new Item({});

      newitem.validateSync();
    });
  });
});
