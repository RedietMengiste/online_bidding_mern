import React from 'react'
import { Navbar } from '../../components/Navbar'
import {Footer} from '../../components/Footer'
import  useScript from '../../components/scripts/scripts'

export const LandingPage = () => {
    useScript("/assets/js/jquery-3.3.1.min.js")
    useScript("/assets/js/modernizr-3.6.0.min.js")
    useScript("/assets/js/plugins.js")
    useScript("/assets/js/bootstrap.min.js")
    useScript("/assets/js/isotope.pkgd.min.js")
    useScript("/assets/js/wow.min.js")
    useScript("/assets/js/waypoints.js")
    useScript("/assets/js/nice-select.js")
    useScript("/assets/js/counterup.min.js")
    useScript("/assets/js/owl.min.js")
    useScript("/assets/js/magnific-popup.min.js")
    useScript("/assets/js/yscountdown.min.js")
    useScript("/assets/js/jquery-ui.min.js")
    useScript("/assets/js/main.js")
    
    return (
        <>
            <Navbar/>
     
    <a href="#0" className={"scrollToTop"}><i className={"fas fa-angle-up"}></i></a>

    <div className={"overlay"}></div>
            <section className={"banner-section bg_img"} data-background="/assets/images/banner/banner-bg-1.png">
                <div className={"container"}>
                <div className={"row align-items-center justify-content-between"}>
                    <div className={"col-lg-6 col-xl-6"}>
                        <div className={"banner-content cl-white"}>
                            <h5 className={"cate"}>Buy Different Products</h5>
                            <h1 className={"title"}><span className={"d-xl-block"}>E-Gebeya</span> Next Deal!</h1>
                            <p>
                                Online Auction is where everyone goes to shop, sell,and give, while discovering variety and affordability.
                            </p>
                            <a href="#0" className={"custom-button yellow btn-large"}>Get Started</a>
                        </div>
                    </div>
                        <div className={"d-none d-lg-block col-lg-6"}>
                            <div className={"banner-thumb-2"}>
                                <img src="/assets/images/banner/banner-5.png" alt="banner"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"banner-shape d-none d-lg-block"}>
                    <img src="/assets/css/img/banner-shape.png" alt="css"/>
                </div>
            </section>

            <div className={"browse-slider-section mt--140"}>
                <div className={"container"}>
                <div className={"section-header-2 cl-white mb-4"}>
                    <div className={"left"}>
                        <h6 className={"title pl-0 w-100"}>Our most common categories <i className={"fas fa-arrow-down"}></i></h6>
                    </div>
                    <div className={"slider-nav"}>
                        <a href="#0" className={"bro-prev"}><i className={"flaticon-left-arrow"}></i></a>
                        <a href="#0" className={"bro-next active"}><i className={"flaticon-right-arrow"}></i></a>
                    </div>
                </div>
                <div className={"m--15"}>
                    <div className={"browse-slider owl-theme owl-carousel"}>
                        <a href="#0" className={"browse-item"}>
                            <img src="/assets/images/auction/01.png" alt="auction"/>
                            <span className={"info"}>Vehicles</span>
                        </a>
                        <a href="#0" className={"browse-item"}>
                            <img src="/assets/images/auction/02.png" alt="auction"/>
                            <span className={"info"}>Jewelry</span>
                        </a>
                        <a href="#0" className={"browse-item"}>
                            <img src="/assets/images/auction/03.png" alt="auction"/>
                            <span className={"info"}>Watches</span>
                        </a>
                        <a href="#0" className={"browse-item"}>
                            <img src="/assets/images/auction/04.png" alt="auction"/>
                            <span className={"info"}>Electronics</span>
                        </a>
                        <a href="#0" className={"browse-item"}>
                            <img src="/assets/images/auction/05.png" alt="auction"/>
                            <span className={"info"}>Sports</span>
                        </a>
                        <a href="#0" className={"browse-item"}>
                            <img src="/assets/images/auction/06.png" alt="auction"/>
                            <span className={"info"}>Real Estate</span>
                        </a>
                    </div>
                </div>
                </div>
            </div>
    <section className={"how-section padding-top"}>
        <div className={"container"}>
            
                <div className={"section-header text-lg-left"}>
                    <h2 className={"title"}>How it works</h2>
                    <p>Easy 3 steps to win</p>
                </div>
                <div className={"row justify-content-center mb--40"}>
                    <div className={"col-md-6 col-lg-4"}>
                        <div className={"how-item"}>
                            <div className={"how-thumb"}>
                                <img src="/assets/images/how/how1.png" alt="how"/>
                            </div>
                            <div className={"how-content"}>
                                <h4 className={"title"}>Sign Up</h4>
                                
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-6 col-lg-4"}>
                        <div className={"how-item"}>
                            <div className={"how-thumb"}>
                                <img src="/assets/images/how/how2.png" alt="how"/>
                            </div>
                            <div className={"how-content"}>
                                <h4 className={"title"}>Bid</h4>
                               
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-6 col-lg-4"}>
                        <div className={"how-item"}>
                            <div className={"how-thumb"}>
                                <img src="/assets/images/how/how3.png" alt="how"/>
                            </div>
                            <div className={"how-content"}>
                                <h4 className={"title"}>Win</h4>
                               
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            
        </div>
        
    </section>
    <section className={"real-estate-auction padding-top padding-bottom pos-rel oh"}>
        <div className={"car-bg"}><img src="/assets/images/auction/realstate/real-bg.png" alt="realstate"/></div>
        <div className={"container"}>
            <div className={"section-header-3"}>
                <div className={"left"}>
                    <div className={"thumb"}>
                        <img src="/assets/images/header-icons/coin-1.png" alt="header-icons"/>
                    </div>
                    <div className={"title-area"}>
                        <h2 className={"title"}>Real Estate</h2>
                        <p>Find auctions for Homes, Condos, Residential & Commercial Properties.</p>
                    </div>
                </div>
                <a href="#0" className={"normal-button"}>View All</a>
            </div>
            <div className={"auction-slider-4 owl-theme owl-carousel"}>
                <div className={"auction-item-4"}>
                    <div className={"auction-thumb"}>
                        <a href="product-details.html"><img src="/assets/images/auction/realstate/auction-1.png" alt="realstate"/></a>
                        <a href="#0" className={"bid"}><i className={"flaticon-auction"}></i></a>
                    </div>
                    <div className={"auction-content"}>
                        <h4 className={"title"}>
                            <a href="product-details.html">Noah real state, Addis Ababa</a>
                        </h4>
                        <div className={"bid-area"}>
                            <div className={"bid-amount"}>
                                <div className={"icon"}>
                                    <i className={"flaticon-auction"}></i>
                                </div>
                                <div className={"amount-content"}>
                                    <div className={"current"}>Current Bid</div>
                                    <div className={"amount"}>$4,000,000</div>
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
                                <div id={"bid_counter30"}></div>
                            </div>
                            <span className={"total-bids"}>30 Bids</span>
                        </div>
                        <div className={"text-center"}>
                            <a href="#0" className={"custom-button"}>Submit a bid</a>
                        </div>
                    </div>
                </div>
                
                <div className={"auction-item-4"}>
                    <div className={"auction-thumb"}>
                        <a href="product-details.html"><img src="/assets/images/auction/realstate/auction-1.png" alt="realstate"/></a>
                        <a href="#0" className={"bid"}><i className={"flaticon-auction"}></i></a>
                    </div>
                    <div className={"auction-content"}>
                        <h4 className={"title"}>
                            <a href="product-details.html">Brand New Apartments In Esenyurt, Istanbul</a>
                        </h4>
                        <div className={"bid-area"}>
                            <div className={"bid-amount"}>
                                <div className={"icon"}>
                                    <i className={"flaticon-auction"}></i>
                                </div>
                                <div className={"amount-content"}>
                                    <div className={"current"}>Current Bid</div>
                                    <div className={"amount"}>$876.00</div>
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
                                <div id={"bid_counter32"}></div>
                            </div>
                            <span className={"total-bids"}>30 Bids</span>
                        </div>
                        <div className={"text-center"}>
                            <a href="#0" className={"custom-button"}>Submit a bid</a>
                        </div>
                    </div>
                </div>
                <div className={"auction-item-4"}>
                    <div className={"auction-thumb"}>
                        <a href="product-details.html"><img src="/assets/images/auction/realstate/auction-1.png" alt="realstate"/></a>
                        <a href="#0" className={"bid"}><i className={"flaticon-auction"}></i></a>
                    </div>
                    <div className={"auction-content"}>
                        <h4 className={"title"}>
                            <a href="product-details.html">Brand New Apartments In Esenyurt, Istanbul</a>
                        </h4>
                        <div className={"bid-area"}>
                            <div className={"bid-amount"}>
                                <div className={"icon"}>
                                    <i className={"flaticon-auction"}></i>
                                </div>
                                <div className={"amount-content"}>
                                    <div className={"current"}>Current Bid</div>
                                    <div className={"amount"}>$876.00</div>
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
                                <div id={"bid_counter33"}></div>
                            </div>
                            <span className={"total-bids"}>30 Bids</span>
                        </div>
                        <div className={"text-center"}>
                            <a href="#0" className={"custom-button"}>Submit a bid</a>
                        </div>
                    </div>
                </div>
                <div className={"auction-item-4"}>
                    <div className={"auction-thumb"}>
                        <a href="product-details.html"><img src="/assets/images/auction/realstate/auction-1.png" alt="realstate"/></a>
                        <a href="#0" className={"bid"}><i className={"flaticon-auction"}></i></a>
                    </div>
                    <div className={"auction-content"}>
                        <h4 className={"title"}>
                            <a href="product-details.html">Brand New Apartments In Esenyurt, Istanbul</a>
                        </h4>
                        <div className={"bid-area"}>
                            <div className={"bid-amount"}>
                                <div className={"icon"}>
                                    <i className={"flaticon-auction"}></i>
                                </div>
                                <div className={"amount-content"}>
                                    <div className={"current"}>Current Bid</div>
                                    <div className={"amount"}>$876.00</div>
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
                                <div id={"bid_counter33"}></div>
                            </div>
                            <span className={"total-bids"}>30 Bids</span>
                        </div>
                        <div className={"text-center"}>
                            <a href="#0" className={"custom-button"}>Submit a bid</a>
                        </div>
                    </div>
                </div>
                </div>
            <div className={"slider-nav real-style ml-auto"}>
                <a href="#0" className={"real-prev"}><i className={"flaticon-left-arrow"}></i></a>
                <div className={"pagination"}></div>
                <a href="#0" className={"real-next active"}><i className={"flaticon-right-arrow"}></i></a>
            </div>
        </div>

    </section>
    <section className={"call-in-section padding-top"}>
        <div className={"container"}>
            <div className={"call-wrapper cl-white bg_img"} data-background="/assets/images/call-in/call-bg.png">
                <div className={"section-header"}>
                    <h3 className={"title"}>Register for Free & Start Bidding Now!</h3>
                    <p>From cars to diamonds to iPhones, we have it all.</p>
                </div>
                <a href="sign-up.html" className={"custom-button white"}>Register</a>
            </div>
        </div>
    </section>
    <Footer/>
    </>
    )
}
