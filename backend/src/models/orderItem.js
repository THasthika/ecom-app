module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2),
  });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE',
    });
  };

  return OrderItem;
};
