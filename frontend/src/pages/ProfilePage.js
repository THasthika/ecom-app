import { titleActions, useTitleDispatch } from 'context/title';
import React, { useEffect } from 'react';

function ProfilePage() {
  const titleDispatch = useTitleDispatch();

  useEffect(() => {
    titleActions.setTitle(titleDispatch, {
      pageTitle: 'Profile',
      documentTitle: 'Profile',
    });
  }, [titleDispatch]);

  return <div></div>;
}

export default ProfilePage;
