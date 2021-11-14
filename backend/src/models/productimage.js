module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    'ProductImage',
    {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      extension: DataTypes.STRING,
      rank: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    { timestamps: false },
  );

  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
    });
  };

  return ProductImage;
};
