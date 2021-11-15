module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.INTEGER,
  });

  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, {
      foreignKey: 'orderId',
      as: 'orderItems',
    });
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Order;
};
