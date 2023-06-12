import Navbar from "./components/Navbar";
import Dashboard from "./pages/admin/Dashboard";
import Signup from "./pages/Signup";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import AddProduct from "./pages/admin/AddProduct";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Signin from "./pages/Signin";
import Summary from "./pages/Summary";
import Payment from "./pages/Payment";
import Protected from "./Protected";
import PageNotFound from "./PageNotFound";
import LoginWithGoogle from "./pages/LoginWithGoogle";
import OrderSuccess from "./pages/OrderSuccess";
import FormValidation from "./FormValidation";
import ForgatPassword from "./pages/ForgatPassword";
import ResetPassword from "./pages/ResetPassword";
import Pagination from "./pages/Pagination";
import PracticePagination from "./pages/PracticePagination";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/" exact component={Pagination} />
        <Route path="/" exact component={PracticePagination} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/product-details/:id"
          component={ProductDetails}
        />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Signin} />
        <Route path="/summary" component={Summary} />
        <Route path="/success" component={OrderSuccess} />
        <Route path="/forget-password" component={ForgatPassword} />
        <Route path="/user/password-reset/:id/:token" component={ResetPassword} />

        <Protected Compo={Payment} path="/payment" />
        <Protected Compo={Dashboard} path="/dashboard" />
        <Protected Compo={AddProduct} path="/add-product" />
        <Route path="*" component={PageNotFound} />
      </Switch>
      {/* <FormValidation /> */}
    </BrowserRouter>
  );
}

export default App;
