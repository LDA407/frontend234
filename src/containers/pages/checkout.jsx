import Layout from "../../hocs/Layout";
import DropIn from "braintree-web-drop-in-react"
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XIcon
} from "@heroicons/react/solid";
import { remove_item, update_item } from "../../redux/actions/cart";
import CartItem from "../../components/CartItem";
import ShippingForm from "../../components/checkout/shippingForm"
import { refresh_token } from "../../redux/actions/auth";
import { payment_total, get_token, payment } from "../../redux/actions/payment";
import { get_shipping } from "../../redux/actions/shipping";
import { countries } from "../../helpers/fixCountries";


const Checkout = ({
  isAuthenticated,
  refresh_token,
  user,
  remove_item,
  update_item,
  payment_total,
  get_token,
  payment,
  items,
  total_items,
  shipping,
  clientToken,
  made_payment,
  loading,
  original_price,
  total_amount,
  total_compare_amount,
  estimated_tax,
  shipping_cost,
  get_shipping
}) => {
  const [render, setRender] = useState(false);
  useEffect(() => {
    window.scrollTo(0,0)
    get_shipping()
  }, []);

  useEffect(() => {
    get_token();
  }, [user]);

  // useEffect(() => {
  //   payment_total(shipping_id, "")
  // }, [shipping_id]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  const showItems = () => {
    return (
      <div>
        {items &&
          items !== null &&
          items !== undefined &&
          items.length !== 0 &&
          items.map((item, itemIdx) => {
            let count = item.count;
            return (
              <div key={itemIdx}>
                <CartItem
                  item={item}
                  count={count}
                  remove_item={remove_item}
                  update_item={update_item}
                  render={render}
                  setRender={setRender}
                />
              </div>
            );
          })}
      </div>
    );
  };
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Payment
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              {showItems()}
            </section>
            {/* Order summary */}
            <ShippingForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  items: state.Cart.items,
  total_items: state.Cart.total_items,
  shipping: state.Shipping.shipping,
  clientToken: state.Payment.clientToken,
  made_payment: state.Payment.made_payment,
  loading: state.Payment.loading,
  original_price: state.Payment.original_price,
  total_amount: state.Payment.total_amount,
  total_compare_amount: state.Payment.total_compare_amount,
  estimated_tax: state.Payment.estimated_tax,
  shipping_cost: state.Payment.shipping_cost
});

export default connect(mapStateToProps, {
  refresh_token,
  remove_item,
  update_item,
  payment_total,
  get_token,
  payment,
  get_shipping
})(Checkout);
