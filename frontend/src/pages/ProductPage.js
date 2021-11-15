import api from '../api';
import { titleActions, useTitleDispatch } from 'context/title';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  IconButton,
  Button,
} from '@mui/material';
import { Image } from 'mui-image';
import { formatPrice, formatQuantity } from 'utils';
import { AddShoppingCart } from '@mui/icons-material';
import { cartActions, useCartDispatch } from 'context/cart';
import { useSnackbar } from 'notistack';

function ProductPage() {
  const titleDispatch = useTitleDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const cartDispatch = useCartDispatch();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const { id } = useParams();

  useEffect(() => {
    titleActions.setTitle(titleDispatch, {
      pageTitle: 'Product Detail',
      documentTitle: 'Product Detail',
    });
  }, [titleDispatch]);

  useEffect(() => {
    console.log('loading product');

    async function fetchData() {
      console.log(id);
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await api.products.getProductById({ id });
        const imageData = await api.products.getProductImages({ id });
        let productImages;
        if (imageData.images.length > 0) {
          productImages = imageData.images.map((v) => {
            return api.products.getProductImageUrl(v);
          });
        } else {
          productImages = [api.products.productPlaceholder];
        }
        const newProduct = { ...data.product, images: productImages };
        setProduct(newProduct);
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [id]);

  function handleAddToCart(product) {
    cartActions.addItem(cartDispatch, product);
    enqueueSnackbar(`${product.title} added to cart`, { variant: 'info' });
  }

  const loadingDiv = <div>Loading...</div>;
  const errorDiv = <div>Error...</div>;

  const productDiv = () => (
    <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <Image src={product.images[0]} />
        </Grid>
        <Grid item sx={{ ml: { xs: 0, sm: 1 } }} flexGrow={1}>
          <Typography variant="h5">{product.title}</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {formatQuantity(product.quantity)}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            price: {formatPrice(product.price)}
          </Typography>
          <Button
            onClick={() => handleAddToCart(product)}
            sx={{ marginLeft: 'auto' }}
            color="primary"
            variant="contained"
          >
            <AddShoppingCart />
          </Button>
        </Grid>
      </Grid>
      {product.images.length > 1 && (
        <>
          <Divider sx={{ mt: 2 }} />
          <Typography variant="h6">More Images</Typography>
          <Grid container spacing={2}>
            {[...product.images].splice(1).map((v) => (
              <Grid item sm={6} md={4} key={v}>
                <Image src={v} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Paper>
  );

  if (isLoading) {
    return loadingDiv;
  } else {
    if (isError) {
      return errorDiv;
    } else {
      console.log(product);
      return productDiv();
    }
  }
}

export default ProductPage;
