const { InternalServerException } = require('../exceptions');
const { Order, OrderItem } = require('../models');

function makeOrdersService({}) {
  async function createOrder({ userId, products }) {
    // create order
    // create order items
  }

  return { createOrder };
}

module.exports = makeOrdersService;
