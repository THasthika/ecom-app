import { Box, Button, Pagination } from '@mui/material';
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
  // const [user, setUser] = useContext(UserContext);

  // const titleDispatch = useTitleDispatch();
  //   titleActions.setTitle(titleDispatch, {
  //     documentTitle: 'Home',
  //     pageTitle: 'Home',
  //   });

  const dispatch = useTitleDispatch();

  useEffect(() => {
    titleActions.setDocumentTitle(dispatch, {
      title: 'Home',
    });
  }, []);

  const [searchState, setSearchState] = useState({
    query: '',
    minPrice: '',
    maxPrice: '',
    minQuantity: '',
    sortBy: '',
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

  return (
    <div>
      <Box pt={2} pb={2}>
        <ProductSearchForm
          query={searchState.query}
          minPrice={searchState.minPrice}
          maxPrice={searchState.maxPrice}
          minQuantity={searchState.minQuantity}
          sortBy={searchState.sortBy}
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
          <ProductGrid products={data.products} handleAddToCard={() => {}} />
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
      <Button onClick={() => {}}>ADD ITEMS</Button>
    </div>
  );
};

export default Home;
