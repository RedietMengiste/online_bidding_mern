import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import {Footer} from '../../components/Footer'
import  useScript from '../../components/scripts/scripts'

export const AboutPage = () => {
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
        <a href="#0" className={"scrollToTop"}><i className={"fas fa-angle-up"}></i></a>
    
    <Navbar/>
    <div className={"hero-section"}>
        <div className={"container"}>
            <ul className={"breadcrumb"}>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                
                <li>
                    <span>About Us</span>
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

    
    <section className={"about-section"}>
        <div className={"container"}>
            <div className={"about-wrapper mt--100 mt-lg--440 padding-top"}>
                <div className={"row"}>
                    <div className={"col-lg-7 col-xl-6"}>
                        <div className={"about-content"}>
                            <h4 className={"subtitle"}>About E-Gebeya</h4>
                            <h2 className={"title"}><span className={"d-block"}>REAL DEAL</span> BIDDING WEBSITE</h2>
                            <p>Innovation have made us leaders in auctions platform!</p>
                            <div className={"item-area"}>
                                <div className={"item"}>
                                    <div className={"thumb"}>
                                        <img src="/assets/images/about/01.png" alt="about"/>
                                    </div>
                                    <p>award-winning team</p>
                                </div>
                                <div className={"item"}>
                                    <div className={"thumb"}>
                                        <img src="/assets/images/about/02.png" alt="about"/>
                                    </div>
                                    <p>AFFILIATIONS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"about-thumb"}>
                    <img src="/assets/images/about/about.png" alt="about"/>
                </div>
            </div>
        </div>
    </section>
    <section className={"overview-section padding-top m-5 p-4"}>
        <div className={"container mw-lg-100 p-lg-0"}>
            <div className={"row m-0"}>
                <div className={"col-lg-6 p-0"}>
                    <div className={"overview-content"}>
                        <div className={"section-header text-lg-left"}>
                            <h2 className={"title"}>What can you expect?</h2>
                            <p>Voluptate aut blanditiis accusantium officiis expedita dolorem inventore odio reiciendis obcaecati quod nisi quae</p>
                        </div>
                        <div className={"row mb--50"}>
                            <div className={"col-sm-6"}>
                                <div className={"expert-item"}>
                                    <div className={"thumb"}>
                                        <img src="/assets/images/overview/01.png" alt="overview"/>
                                    </div>
                                    <div className={"content"}>
                                        <h6 className={"title"}>Real-time Auction</h6>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-sm-6"}>
                                <div className={"expert-item"}>
                                    <div className={"thumb"}>
                                        <img src="/assets/images/overview/02.png" alt="overview"/>
                                    </div>
                                    <div className={"content"}>
                                        <h6 className={"title"}>Supports Multiple Currency</h6>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-sm-6"}>
                                <div className={"expert-item"}>
                                    <div className={"thumb"}>
                                        <img src="/assets/images/overview/03.png" alt="overview"/>
                                    </div>
                                    <div className={"content"}>
                                        <h6 className={"title"}>Winner Announcement</h6>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-sm-6"}>
                                <div className={"expert-item"}>
                                    <div className={"thumb"}>
                                        <img src="/assets/images/overview/04.png" alt="overview"/>
                                    </div>
                                    <div className={"content"}>
                                        <h6 className={"title"}>Supports Multiple Currency</h6>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-sm-6"}>
                                <div className={"expert-item"}>
                                    <div className={"thumb"}>
                                        <img src="/assets/images/overview/05.png" alt="overview"/>
                                    </div>
                                    <div className={"content"}>
                                        <h6 className={"title"}>Show all bidders history</h6>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-sm-6"}>
                                <div className={"expert-item"}>
                                    <div className={"thumb"}>
                                        <img src="/assets/images/overview/06.png" alt="overview"/>
                                    </div>
                                    <div className={"content"}>
                                        <h6 className={"title"}>Add to watchlist</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"col-lg-6 pl-30 pr-0"}>
                    <div className={"w-100 h-100 bg_img"} data-background="/assets/images/banner/banner-1.png"  style={{
            backgroundImage:
              "url(http://pixner.net/sbidu/main/assets/images/banner/banner-1.png)",
          }}></div>
                </div>
            </div>
        </div>
    </section>
   
    
<section className={"team-section padding-top padding-bottom"} style={{backgroundImage:`url(/assets/images/auction/realstate/real-bg.png)`,repeat:'none'}}>

        <div className={"container"}>
            
            <div className={"section-header"}>
                
                <h2 className={"title"}>Dedicated Developers</h2>
                <p>Our team consists of passionate and talented individuals invested in your success.</p>
            </div>
            <div className={"team-wrapper row justify-content-between"}>
                <div className={"team-item"}>
                    <div className={"team-inner"}>
                        <div className={"team-thumb"}>
                            <a href="#0">
                                <img src="/assets/images/about/abi.jpg" alt="team"/>
                            </a>
                        </div>
                        <div className={"team-content"}>
                            <h6 className={"title"}><a href="#0">Abenezer Atnafu</a></h6>
                            <ul className={"social"}>
                                <li>
                                    <a href="#0"><i className={"fab fa-facebook-f"}></i></a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fab fa-twitter"}></i></a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fab fa-instagram"}></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={"team-item"}>
                    <div className={"team-inner"}>
                        <div className={"team-thumb"}>
                            <a href="#0">
                                <img src="/assets/images/about/red.jpg" alt="team"/>
                            </a>
                        </div>
                        <div className={"team-content"}>
                            <h6 className={"title"}><a href="#0">Rediet Mengiste</a></h6>
                            <ul className={"social"}>
                                <li>
                                    <a href="#0"><i className={"fab fa-facebook-f"}></i></a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fab fa-twitter"}></i></a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fab fa-instagram"}></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={"team-item"}>
                    <div className={"team-inner"}>
                        <div className={"team-thumb"}>
                            <a href="#0">
                                <img src="/assets/images/about/red.jpg" alt="team"/>
                            </a>
                        </div>
                        <div className={"team-content"}>
                            <h6 className={"title"}><a href="#0">Rediet Mengiste</a></h6>
                            <ul className={"social"}>
                                <li>
                                    <a href="#0"><i className={"fab fa-facebook-f"}></i></a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fab fa-twitter"}></i></a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fab fa-instagram"}></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={"team-item"}>
                    <div className={"team-inner"}>
                        <div className={"team-thumb"}>
                            <a href="#0">
                                <img src="/assets/images/about/red.jpg" alt="team"/>
                            </a>
                        </div>
                        <div className={"team-content"}>
                            <h6 className={"title"}><a href="#0">Rediet Mengiste</a></h6>
                            <ul className={"social"}>
                                <li>
                                    <a href="#0"><i className={"fab fa-facebook-f"}></i></a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fab fa-twitter"}></i></a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fab fa-instagram"}></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={"team-item"}>
                    <div className={"team-inner"}>
                        <div className={"team-thumb"}>
                            <a href="#0">
                                <img src="/assets/images/about/red.jpg" alt="team"/>
                            </a>
                        </div>
                        <div className={"team-content"}>
                            <h6 className={"title"}><a href="#0">Rediet Mengiste</a></h6>
                            <ul className={"social"}>
                                <li>
                                    <a href="#0"><i className={"fab fa-facebook-f"}></i></a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fab fa-twitter"}></i></a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fab fa-instagram"}></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
        <div className={"call-in-section padding-top"}>
        <div className={"container"}>
            <div className={"call-wrapper cl-white bg_img"} data-background="/assets/images/call-in/call-bg.png"  style={{
            backgroundImage:
              "url(http://pixner.net/sbidu/main/assets/images/call-in/call-bg.png)",
          }}>
                <div className={"section-header"}>
                    <h3 className={"title"}>Register for Free & Start Bidding Now!</h3>
                    <p>From cars to diamonds to iPhones, we have it all.</p>
                </div>
                <a href="sign-up.html" className={"custom-button white"}>Register</a>
            </div>
        </div>
    </div>
    </section>
    
    <Footer/>
    </>
    )
}
