import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route, Switch } from 'react-router';

import { ConnectedRouter } from 'react-router-redux';

import reducer from './reducer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './style.css';

const history = createHistory();

const ENV = process.env.NODE_ENV || 'development';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

let reduxMiddlewares = [thunkMiddleware];
if (ENV === 'development') {
  reduxMiddlewares.push(createLogger);
}

let store = createStore(
  reducer,
  applyMiddleware(...reduxMiddlewares)
);

import Databases from './containers/databases.jsx';
import Collections from './containers/collections.jsx';
import Docs from './containers/docs.jsx';

function About() {
  return 'hello';
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider>
        <div>
          <Drawer width={100} open={true} >
            <AppBar title="首页" style={{ padding: '0 16px' }} showMenuIconButton={false} titleStyle={{ 'cursor': 'pointer' }} onTitleClick={() => { history.push('/'); }} />
            <List>
              <ListItem primaryText="关于" onClick={() => { history.push('/about'); }} />
            </List>
          </Drawer>
          <div style={{
            boxSizing: 'border-box',
            width: '100%',
            padding: '0 20px',
            margin: '10px auto'
          }}>
            <Switch>
              <Route exact path="/" component={Databases} />
              <Route exact path="/about" component={About} />
              <Route exact path="/:database" component={Collections} />
              <Route exact path="/:d/:c" component={Docs} />
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
