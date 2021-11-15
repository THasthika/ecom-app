import { titleActions, useTitleDispatch } from 'context/title';
import React, { useEffect } from 'react';

function OrderHistoryPage() {
  const titleDispatch = useTitleDispatch();

  useEffect(() => {
    titleActions.setTitle(titleDispatch, {
      pageTitle: 'Order History',
      documentTitle: 'Order History',
    });
  }, [titleDispatch]);

  return <div></div>;
}

export default OrderHistoryPage;
