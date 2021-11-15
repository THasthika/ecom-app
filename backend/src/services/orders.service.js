const {
  InternalServerException,
  BadRequestException,
} = require('../exceptions');
const {
  Order,
  OrderItem,
  Product,
  ProductImage,
  sequelize,
} = require('../models');

function makeOrdersService({}) {
  async function createOrder({ userId, products }) {
    // check if order is valid
    const productIds = products.map((v) => v.id);
    const orderItemMap = products.reduce((pv, cv) => {
      pv[cv.id] = cv;
      return pv;
    }, {});
    console.log(orderItemMap);
    const productEntities = await Product.findAll({
      where: {
        id: productIds,
      },
    });
    if (productIds.length !== productEntities.length) {
      throw new BadRequestException('invalid product ids');
    }
    // check if stock is available for all
    const stockAvailable =
      productEntities
        .map((v) => {
          // update price to match with the database
          orderItemMap[v.id].price = v.price;
          return v.quantity - orderItemMap[v.id].amount;
        })
        .filter((v) => v < 0).length == 0;
    if (!stockAvailable) {
      throw new BadRequestException('stock unavailable');
    }

    // update product entities
    const orderEntity = await sequelize.transaction(async (t) => {
      await Promise.all(
        productEntities.map(async (v) => {
          return await v.update(
            { quantity: v.quantity - orderItemMap[v.id].amount },
            t,
          );
        }),
      );

      // create order
      const orderEntity = await Order.create({ userId });

      // create order items
      await Promise.all(
        products.map(async (v) => {
          return await OrderItem.create({
            productId: v.id,
            amount: v.amount,
            price: orderItemMap[v.id].price,
            orderId: orderEntity.id,
          });
        }),
      );

      return orderEntity;
    });

    return orderEntity;
  }

  async function getOrdersByUserId({ userId }) {
    const orders = await Order.findAll({
      where: { userId: userId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
        },
      ],
    });

    const productIdMap = {};
    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        productIdMap[item.productId] = 1;
      });
    });

    const products = await Product.findAll({
      where: { id: Object.keys(productIdMap) },
      include: [
        {
          model: ProductImage,
          as: 'images',
        },
      ],
    });

    return { orders, products };
  }

  return { createOrder, getOrdersByUserId };
}

module.exports = makeOrdersService;
