import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navbar } from "../../components/Navbar";
import useScript from "../../components/scripts/scripts";
import AddAuction from "../../components/auctions/add-auction.js";
import { Bidding } from "../../components/auctions/bidding";
import { Typography } from "antd";

import {
  fetchAllAuctionsSuccessAsync,
  fetchAuctionsByOwnerSuccessAsync,
  fetchAuctionSuccessAsync,
  updateAuctionSuccessAsync,
} from "../../store/auction/action";

import { fetchUserAsync } from "../../store/user/action";

import { PlusOutlined } from "@ant-design/icons";
import { Pagination, Spin, Button } from "antd";

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

  const dispatch = useDispatch();
  const { auctionId } = useParams();

  const { auction, fetchAuctionLoading } = useSelector(
    (state) => state.auction
  );
  const [definedAuction, setDefinedAuction] = useState({});

  useEffect(() => {
    dispatch(fetchUserAsync(user._id));
    dispatch(fetchAuctionSuccessAsync(auctionId));
    setDefinedAuction(auction);
  }, []);

  const { user } = useSelector((state) => state.user);

  const updateBids = (updatedAuction) => {
    dispatch(fetchAuctionSuccessAsync(auctionId));
    setDefinedAuction(updatedAuction);
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
      {currentDate > new Date(auction.bidStart) ? (
        <>
          <Bidding auction={auction} updateBids={updateBids} />
        </>
      ) : (
        <Typography>{`Auction Starts at ${new Date(
          auction.bidStart
        ).toLocaleString()}`}</Typography>
      )}
    </>
  );
};
