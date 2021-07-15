import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import useScript from "../../components/scripts/scripts";
import { fetchUserAsync } from "../../store/user/action";
import { useDispatch, useSelector } from "react-redux";

export const LandingPage = () => {
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
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUserAsync(user._id));
  }, []);

  return (
    <>
      <Navbar />
      <section
        className={"banner-section bg_img"}
        data-background="assets/images/banner/banner-bg-1.png"
        style={{
          backgroundImage:
            "url(http://pixner.net/sbidu/main/assets/images/banner/banner-bg-1.png)",
        }}
      >
        <div className={"container"}>
          <div className={"row align-items-center justify-content-between"}>
            <div className={"col-lg-6 col-xl-6"}>
              <div className={"banner-content cl-white"}>
                <h5 className={"cate"}>Next Generation Auction</h5>
                <h1 className={"title"}>
                  <span className={"d-xl-block"}>Find Your</span> Next Deal!
                </h1>
                <p>
                  Online Auction is where everyone goes to shop, sell,and give,
                  while discovering variety and affordability.
                </p>
                <a href="#0" className={"custom-button yellow btn-large"}>
                  Get Started
                </a>
              </div>
            </div>
            <div className={"d-none d-lg-block col-lg-6"}>
              <div className={"banner-thumb-2"}>
                <img src="assets/images/banner/banner-1.png" alt="banner" />
              </div>
            </div>
          </div>
        </div>
        <div className={"banner-shape d-none d-lg-block"}>
          <img src="assets/css/img/banner-shape.png" alt="css" />
        </div>
      </section>

      <div className={"browse-slider-section mt--140"}>
        <div className={"container"}>
          <div className={"section-header-2 cl-white mb-4"}>
            <div className={"left"}>
              <h6 className={"title pl-0 w-100"}>Browse the highlights</h6>
            </div>
            <div className={"slider-nav"}>
              <a href="#0" className={"bro-prev"}>
                <i className={"flaticon-left-arrow"}></i>
              </a>
              <a href="#0" className={"bro-next active"}>
                <i className={"flaticon-right-arrow"}></i>
              </a>
            </div>
          </div>
          <div className={"m--15"}>
            <div className={"browse-slider owl-theme owl-carousel"}>
              <a href="#0" className={"browse-item"}>
                <img src="assets/images/auction/01.png" alt="auction" />
                <span className={"info"}>Vehicles</span>
              </a>
              <a href="#0" className={"browse-item"}>
                <img src="assets/images/auction/02.png" alt="auction" />
                <span className={"info"}>Jewelry</span>
              </a>
              <a href="#0" className={"browse-item"}>
                <img src="assets/images/auction/03.png" alt="auction" />
                <span className={"info"}>Watches</span>
              </a>
              <a href="#0" className={"browse-item"}>
                <img src="assets/images/auction/04.png" alt="auction" />
                <span className={"info"}>Electronics</span>
              </a>
              <a href="#0" className={"browse-item"}>
                <img src="assets/images/auction/05.png" alt="auction" />
                <span className={"info"}>Sports</span>
              </a>
              <a href="#0" className={"browse-item"}>
                <img src="assets/images/auction/06.png" alt="auction" />
                <span className={"info"}>Real Estate</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
