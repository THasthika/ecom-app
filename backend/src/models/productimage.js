module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    extension: DataTypes.STRING,
    rank: DataTypes.INTEGER,
  });

  ProductImage.associate = (models) => {
    ProductImage.belongsTo(model.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
    });
  };

  return ProductImage;
};
