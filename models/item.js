const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Item',
  // Define your model schema below:
  mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Title required']
    },
    description: {
      type: String,
      required: [true, 'Description required']
    },
    imageUrl: {
      type: String,
      required: [true, 'imageUrl required']
    },
  })
);
