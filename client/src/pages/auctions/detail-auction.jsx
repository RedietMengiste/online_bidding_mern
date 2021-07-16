import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navbar } from "../../components/Navbar";
import useScript from "../../components/scripts/scripts";
import AddAuction from "../../components/auctions/add-auction.js";

import {
  fetchAllAuctionsSuccessAsync,
  fetchAuctionsByOwnerSuccessAsync,
  fetchAuctionSuccessAsync,
} from "../../store/auction/action";

import { fetchUserAsync } from "../../store/user/action";

import { PlusOutlined } from "@ant-design/icons";
import { Pagination, Spin, Button } from "antd";

const calculateTimeLeft = (date) => {
  const difference = date - new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      timeEnd: false,
    };
  } else {
    timeLeft = { timeEnd: true };
  }
  return timeLeft;
};

export const DetailAuctionPage = () => {
  useScript("/assets/js/jquery-3.3.1.min.js");
  useScript("/assets/js/modernizr-3.6.0.min.js");
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

  // time left
  const currentDate = new Date();

  const showTimeLeft = (date) => {
    let timeLeft = calculateTimeLeft(date);
    return (
      !timeLeft.timeEnd && (
        <span>
          {timeLeft.days !== 0 && `${timeLeft.days} d `}
          {timeLeft.hours !== 0 && `${timeLeft.hours} h `}
          {timeLeft.minutes !== 0 && `${timeLeft.minutes} m `}
          {timeLeft.seconds !== 0 && `${timeLeft.seconds} s`} left
        </span>
      )
    );
  };

  const auctionState = (auction) => {
    return (
      <span>
        {currentDate < new Date(auction.bidStart) &&
          `Auction Starts at ${new Date(auction.bidStart).toLocaleString()}`}
        {currentDate > new Date(auction.bidStart) &&
          currentDate < new Date(auction.bidEnd) && (
            <>
              {`Auction is live | ${auction.bids.length} bids |`}{" "}
              {showTimeLeft(new Date(auction.bidEnd))}
            </>
          )}
        {currentDate > new Date(auction.bidEnd) &&
          `Auction Ended | ${auction.bids.length} bids `}
        {currentDate > new Date(auction.bidStart) &&
          auction.bids.length > 0 &&
          ` | Last bid: $ ${auction.bids[0].bid}`}
      </span>
    );
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalOpen, setModal] = useState(false);
  const { auctionId } = useParams();

  const { auction, fetchAuctionLoading } = useSelector(
    (state) => state.auction
  );
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserAsync(user._id));
    dispatch(fetchAuctionSuccessAsync(auctionId));
  }, []);

  const handleAuctionClick = (id) => {
    history.push(`/auctions/${id}/detail`);
  };

  if (fetchAuctionLoading || !auction) {
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
          <Spin tip="Loading Auctions..." />
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
              <Link to="/auctions">Auctions</Link>
            </li>
            <li>
              <span>{auction.itemName}</span>
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
      {/* first three auctions */}

      <section className={"product-details padding-bottom mt--240 mt-lg--440"}>
        <div className={"container"}>
          <div className={"product-details-slider-top-wrapper"}>
            <div
              className={"product-details-slider owl-theme owl-carousel"}
              id="sync1"
            >
              <div className={"slide-top-item"}>
                <div className={"slide-inner"}>
                  <img
                    src={`${process.env.REACT_APP_AUCTION_IMG_URL}/${auction.image}`}
                    alt={auction.name}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={"row mt-40-60-80"}>
            <div className={"col-lg-8"}>
              <div className={"product-details-content"}>
                <ul className={"price-table mb-30"}>
                  <div className={"product-details-header"}>
                    <h2 className={"title"}>{auction.itemName}</h2>
                    <ul>
                      <li>Auction ID: {auction._id}</li>
                    </ul>
                  </div>
                  <li className={"header"}>
                    <h5 className={"current"}>Current Price</h5>
                    <h3 className={"price"}>{auction.startingPrice}</h3>
                  </li>
                  <li>
                    <span className={"details"}>Last Bid</span>
                    {auction.bids && (
                      <h5 className={"info"}>
                        {auction.bids[auction.bids.length - 1]}
                      </h5>
                    )}
                  </li>
                </ul>
                <div className={"product-bid-area"}>
                  <form className={"product-bid-form"}>
                    <div className={"search-icon"}>
                      <img
                        src="/assets/images/product/search-icon.png"
                        alt="product"
                      />
                    </div>
                    <input type="text" placeholder="Enter you bid amount" />
                    <button type="submit" className={"custom-button"}>
                      Submit a bid
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className={"col-lg-4"}>
              <div className={"product-sidebar-area"}>
                <div className={"product-single-sidebar mb-3"}>
                  <h6 className={"title"}>This Auction Ends in:</h6>
                  <div className={"countdown"}>
                    <div id="bid_counter1"> </div>
                  </div>
                  <div className={"side-counter-area"}>
                    <div className={"side-counter-item"}>
                      <div className={"thumb"}>
                        <img
                          src={"/assets/images/product/icon1.png"}
                          alt="product"
                        />
                      </div>
                      <div className={"content"}>
                        <h3 className={"count-title"}>
                          <span className={"counter"}>
                            {auction.startingBid}
                          </span>
                        </h3>
                        <p>Starting Bid</p>
                      </div>
                    </div>

                    <div className={"side-counter-item"}>
                      <div className={"thumb"}>
                        <img
                          src="/assets/images/product/icon3.png"
                          alt="product"
                        />
                      </div>
                      <div className={"content"}>
                        <h3 className={"count-title"}>
                          <span className={"counter"}>
                            {/* {auction.bids.length} */} 0
                          </span>
                        </h3>
                        <p>Total Bids</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={"product-tab-menu-area mb-40-60 mt-70-100"}>
          <div className={"container"}>
            <ul className={"product-tab-menu nav nav-tabs"}>
              <li>
                <a href="#history" data-toggle="tab" className={"active"}>
                  <div className={"thumb"}>
                    <img src="/assets/images/product/tab3.png" alt="product" />
                  </div>
                  <div className={"content"}>
                    Bid History (Total bids: {auction.bids})
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={"container"}>
          <div className={"tab-content"}>
            <div className={"tab-pane show active"} id="details">
              <div className={"tab-details-content"}>
                <div className={"header-area"}>
                  <h3 className={"title"}>
                    {auction.itemName} :
                    <span className={"text-small"}>{auction.description}</span>
                  </h3>
                </div>
              </div>
            </div>

            <div className={""} id="history">
              <div className={"history-wrapper"}>
                <div className={"item"}>
                  <h5 className={"title"}>Bid History</h5>
                  <div className={"history-table-area"}>
                    <table className={"history-table"}>
                      <thead>
                        <tr>
                          <th>Bid Amount</th>
                          <th>Bid Time</th>
                          <th>Bidder</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td data-history="unit price">$900.00</td>
                          <td data-history="time">02:45:25 PM</td>
                          <td data-history="bidder">
                            <div
                              className={"user-info d-flex flex-row-reverse"}
                            >
                              <div className={"thumb"}>
                                <img
                                  src="assets/images/history/01.png"
                                  alt="history"
                                />
                              </div>
                              <div className={"content"}>Moses Watts</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
