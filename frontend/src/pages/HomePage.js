import { Box, Divider, Pagination, Typography } from '@mui/material';
import { cartActions, useCartDispatch } from 'context/cart';
import { titleActions, useTitleDispatch } from 'context/title';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductGrid from '../components/ProductGrid';
import ProductSearchForm from '../components/ProductSearchForm';

const perPage = 20;

const useProductsQueryApi = () => {
  const [data, setData] = useState({ products: [], totalProducts: 0 });
  const [filters, setFilters] = useState({
    page: 1,
    query: {},
  });
  const [maxPages, setMaxPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const results = await api.products.queryProducts({
          params: filters.query,
          page: filters.page,
          perPage: perPage,
        });
        const products = results.products;
        const totalProducts = results.totalProducts;
        // const { products, totalProducts } = getDataFromAPI();
        const maxPages = Math.ceil(totalProducts / perPage);
        setData({ products, totalProducts });
        setMaxPages(maxPages);
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [filters]);

  return [{ data, isLoading, isError, filters, maxPages }, { setFilters }];
};

const HomePage = () => {
  const dispatch = useTitleDispatch();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    titleActions.setTitle(dispatch, {
      documentTitle: 'Home',
      pageTitle: 'Home',
    });
  }, [dispatch]);

  const [searchState, setSearchState] = useState({
    q: '',
    minPrice: '',
    maxPrice: '',
    minQuantity: '',
    sortBy: '',
    sortDir: 'ASC',
  });

  function handleSearchStateChange(key, value) {
    setSearchState({
      ...searchState,
      [key]: value,
    });
  }

  const [{ data, isLoading, isError, filters, maxPages }, { setFilters }] =
    useProductsQueryApi();

  function handleOnSearch() {
    setFilters({ page: 1, query: searchState });
  }

  const cartDispatch = useCartDispatch();

  function handleAddToCart(product) {
    cartActions.addItem(cartDispatch, { ...product });
    enqueueSnackbar(`${product.title} added to cart`, { variant: 'info' });
  }

  return (
    <div>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Products
      </Typography>
      <Divider />
      <Box pt={2} pb={2}>
        <ProductSearchForm
          query={searchState.q}
          minPrice={searchState.minPrice}
          maxPrice={searchState.maxPrice}
          minQuantity={searchState.minQuantity}
          sortBy={searchState.sortBy}
          sortDir={searchState.sortDir}
          handleSubmit={handleOnSearch}
          updateValue={handleSearchStateChange}
        />
      </Box>
      <Box>
        {isLoading ? (
          <div>Loading</div>
        ) : isError ? (
          <div>Error</div>
        ) : (
          <ProductGrid
            products={data.products}
            handleAddToCart={handleAddToCart}
          />
        )}
      </Box>
      <Box mt={2}>
        <Pagination
          sx={{ width: '100%' }}
          count={maxPages}
          showFirstButton={true}
          showLastButton={true}
          page={filters.page}
          onChange={(e, n) => {
            setFilters({ page: n, query: searchState });
          }}
        />
      </Box>
    </div>
  );
};

export default HomePage;
