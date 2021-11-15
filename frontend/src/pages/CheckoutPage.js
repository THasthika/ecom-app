import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useCart, useCartDispatch } from 'context/cart';
import { titleActions, useTitleDispatch } from 'context/title';
import { useUser } from 'context/user';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from 'utils';

function CheckoutPage() {
  const titleDispatch = useTitleDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const user = useUser();

  const cart = useCart();
  const cartDispatch = useCartDispatch();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    titleActions.setTitle(titleDispatch, {
      pageTitle: 'Checkout',
      documentTitle: 'Checkout',
    });
  }, [titleDispatch]);

  useEffect(() => {
    const t = cart.items.reduce((pv, cv) => {
      return pv + cv.price * cv.amount;
    }, 0);
    setTotal(t);
  }, [cart, setTotal]);

  function handleOnOrder() {}

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List disablePadding>
        {cart.items.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.title}
              secondary={product.description}
            />
            <Typography variant="body2" sx={{ mr: 1 }}>
              {`(${formatPrice(product.price)} x ${product.amount})`}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {formatPrice(product.price * product.amount)}
            </Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {formatPrice(total)}
          </Typography>
        </ListItem>
      </List>
      <Box sx={{ textAlign: 'right' }}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ mr: 2 }}
          color="error"
        >
          Cancel
        </Button>
        <Button onClick={handleOnOrder} variant="contained">
          Order
        </Button>
      </Box>
    </Box>
  );
}

export default CheckoutPage;

// return (
//   <div>
//     <Typography variant="h5" sx={{ mt: 2 }}>
//       Items
//     </Typography>
//     <Divider sx={{ mb: 2 }} />
//     {cart.items.map((cartItem) => (
//       <Card sx={{ display: 'flex', mb: 2 }} key={cartItem.id}>
//         {cartItem.images.length > 0 && (
//           <CardMedia
//             component="img"
//             sx={{ maxWidth: 250 }}
//             image={getProductImageUrl(cartItem.images[0])}
//             alt={cartItem.title}
//           />
//         )}
//         <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
//           <CardContent sx={{ flex: '1 0 auto' }}>
//             <Typography component="div" variant="h5">
//               {cartItem.title}
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               color="text.secondary"
//               component="div"
//             >
//               {cartItem.description}
//             </Typography>
//           </CardContent>
//         </Box>
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'right',
//           }}
//         >
//           <CardContent
//             sx={{
//               justifyContent: 'right',
//               justifyItems: 'right',
//               textAlign: 'right',
//               mr: 0,
//               pr: 0,
//             }}
//           >
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'right',
//               }}
//             ></Box>
//             <Box>
//               <Typography variant="h6" sx={{ mr: 2 }}>
//                 Subtotal: {formatPrice(cartItem.price * cartItem.amount)}
//               </Typography>
//             </Box>
//           </CardContent>
//         </Box>
//       </Card>
//     ))}
//     <Typography variant="h6" sx={{ mt: 2, textAlign: 'right' }}>
//       Total: {formatPrice(total)}
//     </Typography>
//     <Box sx={{ mt: 2, textAlign: 'right' }}>
//       <Button variant="contained" color="primary" onClick={handleOnCheckout}>
//         Checkout
//       </Button>
//     </Box>
//   </div>
// );
