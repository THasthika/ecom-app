import { Box, Button, Divider, Pagination, Typography } from '@mui/material';
import { useCartDispatch, cartActions } from 'context/cart';
import { useTitleDispatch, titleActions } from 'context/title';
import React, { useEffect, useState } from 'react';
import { queryProducts } from '../api/products';
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
        const results = await queryProducts(
          filters.query,
          filters.page,
          perPage,
        );
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

const Home = () => {
  const dispatch = useTitleDispatch();

  useEffect(() => {
    titleActions.setTitle(dispatch, {
      documentTitle: 'Home',
      pageTitle: 'Home',
    });
  }, [dispatch]);

  const [searchState, setSearchState] = useState({
    query: '',
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
  }

  return (
    <div>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Products
      </Typography>
      <Divider />
      <Box pt={2} pb={2}>
        <ProductSearchForm
          query={searchState.query}
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

export default Home;
