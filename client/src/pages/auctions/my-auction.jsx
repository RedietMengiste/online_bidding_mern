import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navbar } from "../../components/Navbar";
import useScript from "../../components/scripts/scripts";
import AddAuction from "../../components/auctions/add-auction";

import {
  fetchAllAuctionsSuccessAsync,
  fetchAuctionsByUserSuccessAsync,
  fetchAuctionSuccessAsync,
} from "../../store/auction/action";

import { PlusOutlined } from "@ant-design/icons";
import { Pagination, Spin, Button } from "antd";
import { fetchUserAsync } from "../../store/user/action";

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

export const MyAuctionsPage = () => {
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
      <>
        <div className={"auction-content"}>
          <h6 className={"title"}>
            <a href="#0">{auction.itemName}</a>
          </h6>
          <div className={"bid-area"}>
            <div className={"bid-amount"}>
              <div className={"icon"}>
                <i className={"flaticon-edit"}></i>
              </div>
              <div className={"amount-content"}>
                <div className={"current"}>Bids</div>
                <div className={"amount"}>{auction.bids.length}</div>
              </div>
            </div>
            <div className={"bid-amount"}>
              <div className={"icon"}>
                <i className={"flaticon-money"}></i>
              </div>
              <div className={"amount-content"}>
                <div className={"current"}>Starting Bid</div>
                <div className={"amount"}>{auction.startingBid}</div>
              </div>
            </div>
          </div>
          <div className={"countdown-area"}>
            <div className={"countdown"}>
              <div id="bid_counter27">{auction.endDate}</div>
            </div>
            <Link>
              <span className={"total-bids"}> {auction.seller.firstName}</span>
            </Link>
          </div>
          <div className={"text-center"}>
            <Link to={"/auctions/" + auction._id} className={"custom-button"}>
              See Auctions
            </Link>
          </div>
        </div>

        <span>
          {currentDate < new Date(auction.bidStart) && (
            <>
              <div>
                {`Auction will Start at ${new Date(
                  auction.bidStart
                ).toLocaleString()}`}
              </div>
            </>
          )}
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
      </>
    );
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalOpen, setModal] = useState(false);

  const { auctions, page, limit, total, fetchAuctionsLoading } = useSelector(
    (state) => state.auction
  );
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserAsync(user._id));
    dispatch(fetchAuctionsByUserSuccessAsync(page, limit, user._id));
  }, []);

  const handlePaginationChange = (page) => {
    dispatch(fetchAuctionsByUserSuccessAsync(page, limit, user._id));
  };

  const handleAuctionClick = (id) => {
    history.push(`/auctions/${id}/detail`);
  };

  if (fetchAuctionsLoading || !auctions) {
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
              <span>Auctions</span>
            </li>
          </ul>
          {user.seller && (
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
                  <i className={"flaticon-auction"}></i>
                  &emsp;NEW AUCTION
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
      {/* first three auctions */}

      <section
        className={
          "featured-auction-section padding-bottom mt--240 mt-lg--440 pos-rel"
        }
      >
        <div className={"container"}>
          <div className={"section-header cl-white mw-100 left-style"}>
            <h3 className={"title"}>Auctions</h3>
          </div>
          <div className={"row justify-content-center mb-30-none"}>
            {auctions
              .slice(
                auctions.length > 3 ? auctions.length - 3 : auctions.length
              )
              .map((auction) => {
                return (
                  <div className={"col-sm-10 col-md-6 col-lg-4"}>
                    <div className={"auction-item-2"}>
                      <div className={"auction-thumb"}>
                        <Link>
                          <img
                            src={`${process.env.REACT_APP_AUCTION_IMG_URL}/${auction.image}`}
                            alt={auction.itemName}
                          />
                        </Link>
                      </div>
                      <div className={"auction-content"}>
                        <h6 className={"title"}>
                          <a href="#0">
                            {auction.itemName} {auctionState(auction)}
                          </a>
                        </h6>
                        <div className={"bid-area"}>
                          <div className={"bid-amount"}>
                            <div className={"icon"}>
                              <i className={"flaticon-auction"}></i>
                            </div>
                            <div className={"amount-content"}>
                              <div className={"current"}>
                                {auction.description}
                              </div>
                              <div className={"amount"}>
                                {auction.createdAt}
                              </div>
                            </div>
                          </div>

                          <div className={"bid-amount"}>
                            <div className={"icon"}>
                              <i className={"flaticon-money"}></i>
                            </div>
                            <div className={"amount-content"}>
                              <div className={"current"}>Buy Now</div>
                              <div className={"amount"}>$5,00.00</div>
                            </div>
                          </div>
                        </div>
                        <div className={"countdown-area"}>
                          <div className={"countdown"}>
                            <div id="bid_counter26">auction of </div>
                          </div>
                          <Link>
                            <span className={"total-bids"}>
                              Seller -{" "}
                              {auction.seller.firstName +
                                " " +
                                auction.seller.lastName}
                            </span>
                          </Link>
                        </div>
                        <div className={"text-center"}>
                          <Link
                            to={"/auctions/" + auction._id}
                            className={"custom-button"}
                          >
                            See Auctions
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/*  list of auctions*/}
      <div className={"auction-auction padding-bottom"}>
        <div className={"container"}>
          <div className={"auction-header mb-40"}>
            <div className={"auction-header-item"}>
              <div className={"item"}>Select Category : </div>
              <select name="sort-by" className={"select-bar"}>
                <option value="all">All</option>
                <option value="name">Name</option>
                <option value="date">Date</option>
                <option value="type">Type</option>
                <option value="car">Car</option>
              </select>
            </div>
          </div>

          <div className={"row mb-30-none justify-content-center"}>
            {auctions.map((auction) => {
              return (
                <div className={"col-sm-10 col-md-6 col-lg-4"}>
                  <div className={"auction-item-2"}>
                    <div className={"auction-thumb"}>
                      <Link>
                        <img
                          src={`${process.env.REACT_APP_AUCTION_IMG_URL}/${auction.image}`}
                          alt={auction.name}
                        />
                      </Link>
                    </div>
                    {auctionState(auction)}
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
      <AddAuction isOpen={isModalOpen} onClose={() => setModal(false)} />
    </>
  );
};
