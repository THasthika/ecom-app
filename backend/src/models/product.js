module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    quantity: DataTypes.INTEGER,
  });

  Product.associate = (models) => {
    Product.hasMany(models.ProductImage, {
      foreignKey: 'productId',
      as: 'images',
    });
  };

  return Product;
};
