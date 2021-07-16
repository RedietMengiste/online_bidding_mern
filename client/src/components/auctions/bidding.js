import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navbar } from "../../components/Navbar";
import useScript from "../../components/scripts/scripts";
import AddAuction from "../../components/auctions/add-auction.js";
import Timer from "../../components/auctions/Timer";

import {
  fetchAllAuctionsSuccessAsync,
  fetchAuctionsByOwnerSuccessAsync,
  fetchAuctionSuccessAsync,
} from "../../store/auction/action";

import { fetchUserAsync } from "../../store/user/action";

const io = require("socket.io-client");
const socket = io(process.env.REACT_APP_BASE_URL);

export const Bidding = (props) => {
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

  const dispatch = useDispatch();

  const [bid, setBid] = useState("");
  const [justEnded, setJustEnded] = useState(false);

  const { user } = useSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(fetchUserAsync(user._id));
  // }, []);

  useEffect(() => {
    socket.emit("join auction room", { room: props.auction._id });
    return () => {
      socket.emit("leave auction room", {
        room: props.auction._id,
      });
    };
  }, []);

  useEffect(() => {
    socket.on("new bid", (payload) => {
      props.updateBids(payload);
    });
    return () => {
      socket.off("new bid");
    };
  });

  const handleChange = (event) => {
    setBid(event.target.value);
  };

  const placeBid = () => {
    let newBid = {
      bid: bid,
      time: new Date(),
      bidder: user._id,
    };
    socket.emit("new bid", {
      room: props.auction._id,
      bidInfo: newBid,
    });
    setBid("");
  };

  const update = () => {
    setJustEnded(true);
  };

  const minBid =
    props.auction.bids[0] && props.auction.bids[0].bid > 0
      ? props.auction.bids[0].bid
      : props.auction.startingBid;
  // const minBid = 0;

  return (
    <>
      {/* auction area */}

      <section className={"product-details padding-bottom mt--240 mt-lg--440"}>
        <div className={"container"}>
          <div class="product-details-slider-top-wrapper">
            <div
              class="product-details-slider owl-theme owl-carousel"
              id="sync1"
            >
              <div class="slide-top-item">
                <div class="slide-inner">
                  <img
                    src={`${process.env.REACT_APP_AUCTION_IMG_URL}/${props.auction.image}`}
                    alt="product"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={"row mt-40-60-80"}>
            <div className={"col-lg-8"}>
              <div className={"product-details-content"}>
                {!justEnded && new Date() < new Date(props.auction.bidEnd) && (
                  <>
                    {props.auction.bids.length > 0 && (
                      <div
                        className={"title text-info"}
                      >{` Last bid: $ ${props.auction.bids[0].bid}`}</div>
                    )}
                    <div className={"product-bid-area"}>
                      <form className={"product-bid-form"}>
                        <div className={"search-icon"}>
                          <img
                            src="/assets/images/product/search-icon.png"
                            alt="product"
                          />
                        </div>

                        <input
                          type="number"
                          placeholder="Your Bid (birr)"
                          id={"bid"}
                          value={bid}
                          onChange={handleChange}
                        />
                        <span className={"text-small"}>{`Enter ${Number(
                          minBid + 1
                        )} Birr or more`}</span>
                        <button
                          className={"custom-button"}
                          disabled={bid < minBid + 1}
                          onClick={placeBid}
                        >
                          Submit a bid
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={"col-lg-4"}>
              <div className={"product-sidebar-area"}>
                <div className={"product-single-sidebar mb-3"}>
                  <h6 className={"title"}>This Auction Ends in:</h6>
                  <div className={"countdown"}>
                    <Timer endTime={props.auction.bidEnd} update={update} />
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
                            {props.auction.bids && props.auction.bids[0]
                              ? props.auction.bids[0].bid + 1
                              : props.auction.startingBid + 1}
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
                            {props.auction.bids.length}
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
                    Bid History (Total bids: {props.auction.bids.length})
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
                    {props.auction.itemName} :
                    <span className={"text-small"}>
                      {props.auction.description}
                    </span>
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
                        {props.auction.bids &&
                          props.auction.bids.map((item, index) => {
                            return (
                              <tr>
                                <td data-history="unit price">{`${item.bid} Birr`}</td>
                                <td data-history="time">
                                  {new Date(item.time).toLocaleString()}
                                </td>
                                <td data-history="bidder">
                                  <div
                                    className={
                                      "user-info d-flex flex-row-reverse"
                                    }
                                  >
                                    <div className={"thumb"}>
                                      <img
                                        src="/assets/images/history/01.png"
                                        alt="history"
                                      />
                                    </div>
                                    <div className={"content"}>
                                      {item.bidder.firstName}{" "}
                                      {item.bidder.lastName}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
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
