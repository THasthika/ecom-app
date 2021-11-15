import { AddShoppingCart } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { formatPrice, formatQuantity } from '../utils';

const ProductItem = ({ product, handleAddToCart }) => {
  const productImage =
    product.images.length > 0
      ? api.products.getProductImageUrl(product.images[0])
      : api.products.productPlaceholder;

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={productImage}
        alt="green iguana"
      />
      <CardContent sx={{ pb: 0 }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            sx={{ marginRight: 'auto' }}
            variant="body2"
            fontWeight="bold"
            color="text.secondary"
          >
            {formatQuantity(product.quantity)}
          </Typography>
          <Typography
            sx={{ marginLeft: 'auto' }}
            variant="body2"
            fontWeight="bold"
            color="text.secondary"
          >
            {formatPrice(product.price)}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/products/${product.id}`}>
          View Item
        </Button>
        <IconButton
          onClick={() => handleAddToCart(product)}
          sx={{ marginLeft: 'auto' }}
          color="primary"
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const ProductGrid = ({ products, handleAddToCart }) => {
  return (
    <Grid spacing={2} container>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={3} key={product.id}>
          <ProductItem product={product} handleAddToCart={handleAddToCart} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
