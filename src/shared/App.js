import './App.css';
import React from "react";

import { Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import { useDispatch } from 'react-redux';
import { apiKey } from './firebase';
import { actionCreators as userActions } from '../redux/modules/user';

import PostList from '../pages/PostList';
import Join from '../components/Join';
import Login from '../components/Login';
import { Grid, Button } from '../elements';
import Header from './Header';
import Permit from './Permit';
import PostDetail from '../pages/PostDetail';
import PostWrite from '../pages/PostWrite';

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB())
    }
  }, [])

  return (
    <>
      <Grid width="90%" margin="0 auto">
        <Header />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/join" exact component={Join} />
          <Route path="/write" exact component={PostWrite} />
          <Route path="/write/:id" exact component={PostWrite} />
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button is_float text="+" _onClick={() => { history.push("/write") }}></Button>
      </Permit>
    </>
  );
}

export default App;
