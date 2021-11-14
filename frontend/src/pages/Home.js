import React, { useCallback, useEffect } from 'react';
import { useTitleDispatch, actions as titleActions } from '../context/title';

const Home = () => {
  // const [user, setUser] = useContext(UserContext);

  const titleDispatch = useTitleDispatch();
  titleActions.setTitle(titleDispatch, {
    documentTitle: 'Home',
    pageTitle: 'Home',
  });

  return (
    <div>
      Laborum non consequat enim voluptate magna. Pariatur aliqua enim anim
      commodo ea in qui occaecat irure commodo magna. Ad dolor incididunt Lorem
      consequat aute incididunt et eiusmod. Eu dolor irure sit anim sint sunt
      elit nulla commodo.
      {/* <div>
        <pre>{JSON.stringify(user)}</pre>
      </div>
      <button
        onClick={async () => {
          setUser({ ok: 1 });
        }}
      >
        xx
      </button> */}
    </div>
  );
};

export default Home;
