import { AddShoppingCart } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { getProductImageUrl } from '../api/products';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils';

const ProductGrid = ({ products, handleAddToCard }) => {
  return (
    <Grid spacing={2} container>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={3} key={product.id}>
          <Card>
            <CardActionArea component={Link} to={`/products/${product.id}`}>
              {product.images.length > 0 && (
                <CardMedia
                  component="img"
                  height="140"
                  image={getProductImageUrl(product.images[0])}
                  alt="green iguana"
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Typography
                sx={{ marginLeft: 'auto' }}
                variant="body2"
                color="text.secondary"
              >
                {formatPrice(product.price)}
              </Typography>
              <IconButton
                onClick={() => handleAddToCard(product)}
                color="primary"
              >
                <AddShoppingCart />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
