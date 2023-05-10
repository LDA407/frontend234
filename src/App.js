import { Provider } from 'react-redux';
import store from './store';
// navegacion instalar react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./containers/Home.jsx";
import { Er404 } from './containers/errors/er404.jsx';
import Signup from './containers/auth/Signup';
import Activate from './containers/auth/Activate';
import Login from './containers/auth/Login';
import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';
import Market from "./containers/market.jsx";
import ProductDeatil from './containers/pages/productsDetail.jsx';
import SearchResults from "./containers/pages/searchResult.jsx";
import Cart from './containers/pages/cart.jsx'
import Checkout from './containers/pages/checkout';
// import PrivateRoute from './hocs/PrivateRoute';
import ThankYou from './containers/pages/thankYou'
import Dashboard from './containers/pages/dashboard'
import DashboardPayment from './containers/pages/dashboardPayment'
import DashboardPaymentDetail from './containers/pages/dashboardPaymentDetail'



function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<Er404 />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/activate/:uid/:token" element={<Activate />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/reset_password" element={<ResetPassword />} />
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            element={<ResetPasswordConfirm />}
          />
          <Route exact path="/market" element={<Market />} />
          <Route
            exact
            path="/products/detail/:productID"
            element={<ProductDeatil />}
          />
          <Route exact path="/products/search" element={<SearchResults />} />
          <Route exact path="/thankyou" element={<ThankYou />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/dashboard/payment/history" element={<DashboardPayment />} />
          <Route exact path="/dashboard/payment/detail/:transaction_id" element={<DashboardPaymentDetail />} />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
