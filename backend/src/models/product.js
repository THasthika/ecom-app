module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
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
