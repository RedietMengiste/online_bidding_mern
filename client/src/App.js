import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import "./assets/css/all.min.css"
import "./assets/css/animate.css"
import "./assets/css/bootstrap.min.css"
import "./assets/css/flaticon.css"
import "./assets/css/jquery-ui.min.css"
import "./assets/css/magnific-popup.css"
import "./assets/css/main.css"
import "./assets/css/nice-select.css"
import "./assets/css/owl.min.css"
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import NotFoundPage from "./pages/not-found";

import {LandingPage} from "./pages/landing";

import { ShopPage } from "./pages/shops";
import {MyShopPage} from "./pages/shops/my-shops"

import {ProductPage} from "./pages/products"
import {ShopProducts} from "./pages/products/shop-products"

import { AuctionPage } from "./pages/auctions";
import GuardedRoute from "./components/guarded-route";

const App = () => {

  return (
    <Switch>
      <Route exact path="/">
        <LandingPage/>
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/signup">
        <SignUpPage />
      </Route>

{/* public routes */}
      <Route exact path="/shops">
        <ShopPage/>
      </Route>
      <Route exact path="/products">
        <ProductPage />
      </Route>

{/* auction routes */}
      <Route exact path="/auctions">
        <AuctionPage />
      </Route>

{/* shop routes */}
      <GuardedRoute exact path="/shops/:userId">
        <MyShopPage />
      </GuardedRoute>

  {/* product routes */}

      <GuardedRoute exact path="/products/:shopId">
        <ShopProducts/>
      </GuardedRoute>
      
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default App;
