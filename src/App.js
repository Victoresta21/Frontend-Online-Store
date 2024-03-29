import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import DetailsPage from './pages/DetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route exact path="/cart-page" render={ (props) => <CartPage { ...props } /> } />
        <Route
          exact
          path="/details/:id"
          render={ (props) => (<DetailsPage { ...props } />) }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
