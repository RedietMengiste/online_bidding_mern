import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Form, Input, Button, CheckboxForm, Checkbox } from "antd";

import { Navbar } from "../../components/Navbar";
import useScript from "../../components/scripts/scripts";

import { fetchUserAsync, updateUserAsync } from "../../store/user/action";

import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Pagination, Spin } from "antd";

export const ProfilePage = () => {
  useScript("assets/js/jquery-3.3.1.min.js");
  useScript("assets/js/modernizr-3.6.0.min.js");
  useScript("assets/js/plugins.js");
  useScript("assets/js/bootstrap.min.js");
  useScript("assets/js/isotope.pkgd.min.js");
  useScript("assets/js/wow.min.js");
  useScript("assets/js/waypoints.js");
  useScript("assets/js/nice-select.js");
  useScript("assets/js/counterup.min.js");
  useScript("assets/js/owl.min.js");
  useScript("assets/js/magnific-popup.min.js");
  useScript("assets/js/yscountdown.min.js");
  useScript("assets/js/jquery-ui.min.js");
  useScript("assets/js/main.js");

  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalOpen, setModal] = useState(false);

  //   const { user, fetchUserLoading } = useSelector(
  //     (state) => state.product
  //   );
  const { user, fetchUserLoading } = useSelector((state) => state.user);
  const onHandleChecked = () => {
    if (user.seller) {
      dispatch(updateUserAsync(user._id, { ...user, seller: false }));
    } else {
      dispatch(updateUserAsync(user._id, { ...user, seller: true }));
    }
  };
  const onFinish = (values) => {};
  useEffect(() => {
    dispatch(fetchUserAsync(user._id));
  }, []);

  const handleProductClick = (id) => {
    history.push(`/products/${id}/detail`);
  };

  if (fetchUserLoading || !user) {
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
          <Spin tip="Loading User Detail..." />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {/* bread crumb */}
      <div className={"hero-section style-2"}>
        <div className={"container"}>
          <ul className={"breadcrumb"}>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <span>Personal Profile</span>
            </li>
          </ul>
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
      <section class="dashboard-section padding-bottom mt--240 mt-lg--440 pos-rel">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-sm-10 col-md-7 col-lg-4">
              <div class="dashboard-widget mb-30 mb-lg-0 sticky-menu">
                <div class="user">
                  <Form initialValues={{ remember: true }} onFinish={onFinish}>
                    <div class="thumb-area">
                      <div class="thumb">
                        <img
                          src={
                            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fpng-dweyv&psig=AOvVaw0wxhL28RRJGrM7TlNTvEnG&ust=1626372632841000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKi7z6-U4_ECFQAAAAAdAAAAABAD"
                          }
                          alt="user"
                        />
                      </div>
                      <label for="profile-pic" class="profile-pic-edit">
                        <i class="flaticon-pencil"></i>
                      </label>
                      <input
                        type="file"
                        id="profile-pic"
                        class="d-none"
                      ></input>
                    </div>
                  </Form>
                  <div class="content">
                    <h5 class="title">
                      <a href="#0">{`${user.firstName} ${user.lastName}`}</a>
                    </h5>
                    <span class="username">{user.email}</span>
                  </div>
                </div>
                <ul class="dashboard-menu">
                  <li>
                    <a href="dashboard.html">
                      <i class="flaticon-dashboard"></i>Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="#0" class="active">
                      <i class="flaticon-settings"></i>Personal Profile{" "}
                    </a>
                  </li>
                  <li>
                    <a href="my-bid.html">
                      <i class="flaticon-auction"></i>My Bids
                    </a>
                  </li>
                  <li>
                    <a href="winning-bids.html">
                      <i class="flaticon-best-seller"></i>Winning Bids
                    </a>
                  </li>
                  <li>
                    <a href="notifications.html">
                      <i class="flaticon-alarm"></i>My Alerts
                    </a>
                  </li>
                  <li>
                    <a href="my-favorites.html">
                      <i class="flaticon-star"></i>My Favorites
                    </a>
                  </li>
                  <li>
                    <a href="referral.html">
                      <i class="flaticon-shake-hand"></i>Referrals
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="row">
                <div class="col-12">
                  <div class="dash-pro-item mb-30 dashboard-widget">
                    <div class="header">
                      <h4 class="title">Personal Details</h4>
                    </div>
                    <ul class="dash-pro-body">
                      <li>
                        <div class="info-name">Name</div>
                        <div class="info-value">{`${user.firstName} ${user.lastName}`}</div>
                      </li>
                      <li>
                        <div class="info-name">Email</div>
                        <div class="info-value">{user.email}</div>
                      </li>
                      <li>
                        <div class="info-name">Member since</div>
                        <div class="info-value">
                          {new Date(user.createdAt).toUTCString()}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-12">
                  <div class="dash-pro-item mb-30 dashboard-widget">
                    <div class="header">
                      <h4 class="title">Account Settings</h4>
                    </div>
                    <ul class="dash-pro-body">
                      <li>
                        <div class="info-name">Language</div>
                        <div class="info-value">Amharic (Ethiopia)</div>
                      </li>

                      <li>
                        <div class="info-name">Seller</div>
                        <div class="info-value">
                          {user.seller && (
                            <>
                              <i class="flaticon-check text-success"></i> Seller
                              <Switch
                                defaultChecked
                                onChange={onHandleChecked}
                                size="default"
                                className={"info-name"}
                              />
                            </>
                          )}
                          {!user.seller && (
                            <>
                              <div>Not Seller</div>

                              <Switch
                                onChange={onHandleChecked}
                                size="default"
                                className={"info-name"}
                              />
                            </>
                          )}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-12">
                  <div class="dash-pro-item mb-30 dashboard-widget">
                    <div class="header">
                      <h4 class="title">Email Address</h4>
                    </div>
                    <ul class="dash-pro-body">
                      <li>
                        <div class="info-name">Email</div>
                        <div class="info-value">{user.email}</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-12">
                  <div class="dash-pro-item mb-30 dashboard-widget">
                    <div class="header">
                      <h4 class="title">Phone</h4>
                    </div>
                    <ul class="dash-pro-body">
                      <li>
                        <div class="info-name">Mobile</div>
                        <div class="info-value">{user.phonenumber}</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
