import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
} from '@mui/material';
import React, { useState } from 'react';

const ProductSearchForm = ({
  q,
  minPrice,
  maxPrice,
  minQuantity,
  sortBy,
  sortDir,
  updateValue,
  handleSubmit,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="body1" mb={1} ml={1}>
            Search
          </Typography>
          <TextField
            size="small"
            label="Search"
            variant="outlined"
            fullWidth
            value={q}
            onChange={(e) => {
              updateValue('q', e.target.value);
            }}
          />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent
              sx={{
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: `0px !important`,
              }}
            >
              <Box>
                <TextField
                  size="small"
                  label="Price (Min)"
                  sx={{ marginRight: 2 }}
                  value={minPrice}
                  onChange={(e) => {
                    updateValue('minPrice', e.target.value);
                  }}
                ></TextField>
                <TextField
                  size="small"
                  label="Price (Max)"
                  value={maxPrice}
                  onChange={(e) => {
                    updateValue('maxPrice', e.target.value);
                  }}
                ></TextField>
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <TextField
                  size="small"
                  label="Quantity (Min)"
                  sx={{ marginRight: 2 }}
                  value={minQuantity}
                  onChange={(e) => {
                    updateValue('minQuantity', e.target.value);
                  }}
                ></TextField>
              </Box>
              <FormControl
                size="small"
                sx={{ minWidth: 120, marginTop: 2, marginRight: 2 }}
              >
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  size="small"
                  labelId="sort-by-label"
                  id="sort-by"
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => {
                    updateValue('sortBy', e.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'title'}>Title</MenuItem>
                  <MenuItem value={'price'}>Price</MenuItem>
                  <MenuItem value={'quantity'}>Quantity</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120, marginTop: 2 }}>
                <InputLabel id="sort-direction-label">
                  Sort Direction
                </InputLabel>
                <Select
                  size="small"
                  labelId="sort-direction-label"
                  id="sort-direction"
                  value={sortDir}
                  label="Sort Direction"
                  onChange={(e) => {
                    updateValue('sortDir', e.target.value);
                  }}
                >
                  <MenuItem value="ASC">Ascending</MenuItem>
                  <MenuItem value={'DESC'}>Descending</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Collapse>
          <CardActions
            disableSpacing
            sx={{ paddingTop: 2, paddingLeft: 0, paddingRight: 0 }}
          >
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              Search
            </Button>

            <Button
              sx={{
                marginLeft: 'auto',
              }}
              onClick={handleExpandClick}
            >
              Advance Options
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductSearchForm;
