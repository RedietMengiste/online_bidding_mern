import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navbar } from "../../components/Navbar";
import useScript from "../../components/scripts/scripts";
import AddProduct from "../../components/products/add-product";

import {
  fetchAllProductsSuccessAsync,
  fetchProductsByShopSuccessAsync,
  fetchProductSuccessAsync,
  fetchProductsByCategorySuccessAsync,
} from "../../store/product/action";

import { PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import { Pagination, Spin, Button } from "antd";
import { fetchUserAsync } from "../../store/user/action";
import AddToCart from "../../components/cart/addToCart";

export const ShopProducts = () => {
  useScript("/assets/js/modernizr-3.6.0.min.js");
  useScript("/assets/js/jquery-3.3.1.min.js");
  useScript("/assets/js/plugins.js");
  useScript("/assets/js/bootstrap.min.js");
  useScript("/assets/js/isotope.pkgd.min.js");
  useScript("/assets/js/wow.min.js");
  useScript("/assets/js/waypoints.js");
  useScript("/assets/js/nice-select.js");
  useScript("/assets/js/counterup.min.js");
  useScript("/assets/js/owl.min.js");
  useScript("/assets/js/magnific-popup.min.js");
  useScript("/assets/js/yscountdown.min.js");
  useScript("/assets/js/jquery-ui.min.js");
  useScript("/assets/js/main.js");

  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalOpen, setModal] = useState(false);
  const [search, setSearch] = useState("");

  const { shopId } = useParams();
  const { products, page, limit, total, fetchProductsLoading } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    user && dispatch(fetchUserAsync(user._id));
    dispatch(fetchProductsByShopSuccessAsync(page, limit, shopId));
  }, []);
  useEffect(() => {
    dispatch(fetchProductsByCategorySuccessAsync);
  }, [search]);

  const handlePaginationChange = (page) => {
    dispatch(fetchProductsByShopSuccessAsync(page, limit, shopId));
  };
  const handleQuery = (event) => {
    setSearch(event.target.value);
  };
  const handleProductClick = (id) => {
    history.push(`/products/${id}/detail`);
  };

  if (fetchProductsLoading || !products) {
    return (
      <>
        <Navbar />
        <div
          style={{
            width: "100%",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin tip="Loading Products..." />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {/* bread crumb */}
      <div class="cart-sidebar-area">
        <div class="top-content">
          <a href="index.html" class="logo">
            <img src="/static/media/logo.66f7d86d.png" alt="logo" />
          </a>
          <span class="side-sidebar-close-btn">
            <i class="fas fa-times"></i>
          </span>
        </div>
        <div class="bottom-content">
          <div class="cart-products">
            <h4 class="title">Shopping cart</h4>
            <div class="single-product-item">
              <div class="thumb">
                <a href="#0">
                  <img
                    src="http://localhost:5000/images/products/product-1626435787257-image.jpg"
                    alt="shop"
                  />
                </a>
              </div>
              <div class="content">
                <h4 class="title">
                  <a href="#0">Macbook air</a>
                </h4>
                <div class="price">
                  <span class="pprice">89000 Birr</span>{" "}
                </div>
                <a href="/" class="remove-cart">
                  Remove
                </a>
              </div>
            </div>
            <div class="btn-wrapper text-center">
              <a href="#0" class="custom-button">
                <span>Checkout</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className={"hero-section style-2"}>
        <div className={"container"}>
          <ul className={"breadcrumb"}>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <span>
                Products of{" "}
                {products.length > 0 ? products[0].shop.name : "Shop"}
              </span>
            </li>
          </ul>
          {user && user.seller && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "20px",
                }}
              >
                <button
                  className={"custom-button btn-large"}
                  type="default"
                  onClick={() => setModal(true)}
                >
                  <i className={"flaticon-bag"}></i>
                  &emsp;NEW PRODUCT
                </button>
              </div>
            </>
          )}
        </div>
        <div
          className={"bg_img hero-bg bottom_center"}
          style={{
            backgroundImage:
              "url(http://pixner.net/sbidu/main/assets/images/banner/hero-bg.png)",
          }}
          data-background="http://pixner.net/sbidu/main/assets/images/banner/hero-bg.png"
        ></div>
      </div>
      {/* first three products */}

      <section
        className={
          "featured-auction-section padding-bottom mt--240 mt-lg--440 pos-rel"
        }
      >
        <div className={"container"}>
          <div className={"section-header cl-white mw-100 left-style"}>
            <h3 className={"title"}>
              Latest Products of{" "}
              {products.length > 0 ? products[0].shop.name : "Shop"}
            </h3>
          </div>
          <div className={"row justify-content-center mb-30-none"}>
            {products
              .slice(
                products.length > 3 ? products.length - 3 : products.length
              )
              .map((product) => {
                return (
                  <div className={"col-sm-10 col-md-6 col-lg-4"}>
                    <div className={"auction-item-2"}>
                      <div className={"auction-thumb"}>
                        <Link>
                          <img
                            src={`${process.env.REACT_APP_PRODUCT_IMG_URL}/${product.image}`}
                            alt={product.name}
                          />
                        </Link>
                      </div>
                      <div className={"auction-content"}>
                        <h6 className={"title"}>
                          <a href="#0">{product.name}</a>
                        </h6>
                        <div className={""}>
                          <div className={"bid-amount"}>
                            <div className={"icon"}>
                              <i className={"flaticon-auction"}></i>
                            </div>
                            <div className={"amount-content"}>
                              <div className={"current"}>
                                {product.description}
                              </div>
                              <div className={"amount"}>
                                {product.createdAt}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={"countdown-area"}>
                          <Link>
                            <span className={"total-bids"}>
                              Shop - {product.shop.name}
                            </span>
                          </Link>
                        </div>
                        {/* <div className={"text-center"}>
                          <Link to="/products" className={"custom-button"}>
                            See Product Detail
                          </Link>
                        </div> */}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {products.length < 1 && (
        <div className={"product-auction padding-bottom"}>
          <div className={"conatiner"}>
            <div className={"mb-30-none justify-content-center"}>
              No Products Available!
            </div>
          </div>
        </div>
      )}

      {/*  list of products*/}
      {products.length > 0 && (
        <div className={"product-auction padding-bottom"}>
          <div className={"container"}>
            {/* <div className={"product-header mb-40"}>
              <div className={"product-header-item"}>
                <div className={"item"}>Select Category : </div>
                <select
                  onChange={handleQuery}
                  name="sort-by"
                  className={"select-bar"}
                >
                  <option value="all">All</option>
                  <option value="furniture">furniture</option>
                  <option value="laptop">Laptop</option>
                  <option value="realstate">Realstate</option>
                  <option value="car">Car</option>
                </select>
              </div>
            </div> */}

            <div className={"row mb-30-none justify-content-center"}>
              {products.map((product) => {
                return (
                  <div className={"col-sm-10 col-md-6 col-lg-4"}>
                    <div className={"auction-item-2"}>
                      <div className={"auction-thumb"}>
                        <Link>
                          <img
                            src={`${process.env.REACT_APP_PRODUCT_IMG_URL}/${product.image}`}
                            alt={product.name}
                          />
                        </Link>
                      </div>
                      <div className={"auction-content"}>
                        <h6 className={"title"}>
                          <a href="#0">{product.name}</a>
                          <AddToCart item={product} />
                        </h6>

                        <div className={""}>
                          <div className={"bid-amount"}>
                            <div className={"icon"}>
                              <i className={"flaticon-title"}></i>
                            </div>
                            <div class="price">
                              {product.price}
                              {" Birr "}
                            </div>

                            <div className={"amount-content"}>
                              <div className={"current"}>
                                {product.description}
                              </div>
                              <div className={"amount"}>
                                {product.createdAt}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={"countdown-area"}>
                          <Link>
                            <span className={"total-bids"}>
                              Shop - {product.shop.name}
                            </span>
                          </Link>
                        </div>
                        {/* <div className={"text-center"}>
                          <a href="#0" className={"custom-button"}>
                            See Product Detail
                          </a>
                        </div> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              {total !== 0 && (
                <Pagination
                  defaultCurrent={page}
                  total={total}
                  onChange={handlePaginationChange}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <AddProduct isOpen={isModalOpen} onClose={() => setModal(false)} />
    </>
  );
};
