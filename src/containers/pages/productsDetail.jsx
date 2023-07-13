import Layout from "../../hocs/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  get_product,
  get_related_product
} from "../../redux/actions/products";
import {
  get_items,
  add_item,
  get_total,
  get_items_total
} from "../../redux/actions/cart";
import { useEffect, useState } from "react";
import { Oval, Loader } from "react-loader-spinner";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/solid";
import { HeartIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import Gallery from "../../components/products/ProductsGallery";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDeatil = ({
    get_product,
    get_related_product,
    product,
    get_items,
    add_item,
    get_total,
    get_items_total
  }) => {
  const params = useParams();
  const productID = params.productID;
  //   const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const addToCart = async () => {
    if (product && product !== null && product !== undefined && product.quantity > 0){
      setLoading(true);
      await add_item(product);
      await get_items();
      await get_total();
      await get_items_total();
      setLoading(false);
      navigate('/cart');
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    get_product(productID);
    get_related_product(productID);
  }, []);

  // if (requestSent && !loading) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            <Tab.Group as="div" className="flex flex-col-reverse">
              <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {
                    product &&
                    product !== null &&
                    product.gallery.map((image) => (
                    <Tab
                      key={image.id}
                      className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">"idlaklk"</span>
                          <span className="absolute inset-0 rounded-md overflow-hidden">
                            <img src={"http://127.0.0.1:8000"+image.image} alt="" className="w-full h-full object-center object-cover" />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-indigo-500' : 'ring-transparent',
                              'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                {
                  product &&
                  product !== null &&
                  product.gallery.map((image) => (
                  <Tab.Panel key={image.id}>
                    <img
                      src={"http://127.0.0.1:8000"+image.image}
                      className="w-full h-full object-center object-cover sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product && product !== null && product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">
                  {product && product !== null && product.price}
                </p>
              </div>

              {/* Reviews 
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? "text-indigo-500"
                            : "text-gray-300",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>*/}

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{
                    __html:product && product !== null && product.description,
                  }}
                />
              </div>

              <div className="mt-6">
                {/* Colors */}
                <div>
                  <h3 className="text-sm text-gray-600">Color</h3>
                  {/* 
                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedColor,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="p" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.bgColor,
                              "h-8 w-8 border border-black border-opacity-10 rounded-full"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup> */}
                </div>
                <div className="">
                  {
                    product &&
                    product !== null &&
                    product !== undefined &&
                    product.quantity > 0 ?(
                      <span classes="text-green-500">
                        in stock
                      </span>
                    ) : (
                      <span classes="text-red-500">
                        out of stock
                      </span>
                    )
                  }
                </div>
                <div className="mt-10 flex sm:flex-col1">
                  {loading ? (
                    <button
                      type="submit"
                      className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                    >
                      <Oval color="#fff" width={20} height={20} />
                    </button>
                  ) : (
                    <button
                      onClick={addToCart}
                      className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                    >
                      Agregar al carrito
                    </button>
                  )}
                  <button
                    type="button"
                    className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon
                      className="h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </div>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="border-t divide-y divide-gray-200">
                  {/* {product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                              <span
                                className={classNames(
                                  open ? "text-indigo-600" : "text-gray-900",
                                  "text-sm font-medium"
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="pb-6 prose prose-sm"
                          >
                            <ul role="list">
                              {detail.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))} */}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
	product: state.Products.product
});

export default connect(mapStateToProps, {
  get_product,
  get_related_product,
  get_items,
  add_item,
  get_total,
  get_items_total
})(ProductDeatil);
