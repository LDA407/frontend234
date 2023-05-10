import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { get_categories } from "../../redux/actions/categories";
import {
  get_products,
  get_filtered_products,
} from "../../redux/actions/products";
import ProductsCard from "../../components/products/ProductsCard";
import NavBar from "../../components/navigation/NavBar";
import Footer from "../../components/navigation/Footer";

const prices = [
  {
    id: 0,
    name: "Any",
  },
  {
    id: 1,
    name: "1-19",
  },
  {
    id: 2,
    name: "20-39",
  },
  {
    id: 3,
    name: "40-59",
  },
  {
    id: 4,
    name: "60-79",
  },
  {
    id: 5,
    name: "More than 80",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SearchResults = ({
  // get_categories,
  // categories,
  // get_products,
  // products,
  get_filtered_products,
  search_products,
}) => {
  useEffect(() => {
    get_categories();
    get_products();
  }, []);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isfiltered, setIsfiltered] = useState(false);
  const [formData, setFormData] = useState({
    category_id: "0",
    sortBy: "date_created",
    price_range: "Any",
    order: "desc",
  });
  const { category_id, sortBy, price_range, order } = formData;

  const handleOnChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  console.log(formData);
  const onSubmit = (e) => {
    e.preventDefault();
    get_filtered_products(category_id, sortBy, price_range, order);
    setIsfiltered(true);
  };

  return (
    <Fragment>
      <NavBar/>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {search_products &&
              search_products !== null &&
              search_products !== undefined &&
              search_products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={product.get_image}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={`/products/detail/${product.id}`}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.description}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer/>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  search_products: state.Products.search_products,
});

export default connect(mapStateToProps, {
  get_categories,
  // get_products,
  get_filtered_products,
})(SearchResults);
