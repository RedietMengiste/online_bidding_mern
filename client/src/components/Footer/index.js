import React from 'react'
import { Link } from 'react-router-dom'
export const Footer = () => {


    return (
    
        <footer className={"bg_img padding-top oh"} data-background="assets/images/footer/footer-bg.jpg"  style={{
            backgroundImage:
              "url(http://pixner.net/sbidu/main/assets/images/footer/footer-bg.jpg)",
          }}>
        <div className={"footer-top-shape"}>
            <img src="assets/css/img/footer-top-shape.png" alt="css"/>
        </div>
        <div className={"anime-wrapper"}>
            <div className={"anime-1 plus-anime"}>
                <img src="assets/images/footer/p1.png" alt="footer"/>
            </div>
            <div className={"anime-2 plus-anime"}>
                <img src="assets/images/footer/p2.png" alt="footer"/>
            </div>
            <div className={"anime-3 plus-anime"}>
                <img src="assets/images/footer/p3.png" alt="footer"/>
            </div>
            <div className={"anime-5 zigzag"}>
                <img src="assets/images/footer/c2.png" alt="footer"/>
            </div>
            <div className={"anime-6 zigzag"}>
                <img src="assets/images/footer/c3.png" alt="footer"/>
            </div>
            <div className={"anime-7 zigzag"}>
                <img src="assets/images/footer/c4.png" alt="footer"/>
            </div>
        </div>
        <div className={"newslater-wrapper"}>
            <div className={"container"}>
                <div className={"newslater-area row"}>
                    <div className={"col-lg-4"}>
                        <img src="assets/images/footer/login.svg"  width='250px' alt="footer"/>
                        <h4 className={" cate"}style={{padding:'30px',marginLeft:'50px',color:'#6C63FF'}}>
                            Sign-up
                        </h4>
                    </div>
                    <div className={"col-lg-4"}>
                        <img src="assets/images/footer/view.svg" width='250px' alt="footer"/>
                        <h4 className={"cate"}style={{padding:'30px',paddingTop:'50px',marginLeft:'50px',color:'#6C63FF'}}>
                            View
                        </h4>
                    </div>
                    <div className={"col-lg-4"}>
                        <img src="assets/images/footer/buy.svg" width='250px' alt="footer"/>
                        <h4 className={"cate"}style={{padding:'30px',marginLeft:'50px',color:'#6C63FF'}}>
                            Buy Products
                        </h4>
                    </div>
                    
                  
                </div>
            </div>
        </div>
        <div className={"footer-top padding-bottom padding-top"}>
            <div className={"container"}>
                <div className={"row mb--60"}>
                    <div className={"col-sm-6 col-lg-3"}>
                        <div className={"footer-widget widget-links"}>
                            <h5 className={"title"}>Auction Categories</h5>
                            <ul className={"links-list"}>
                              
                                <li>
                                    <a href="#0">Vehicles</a>
                                </li>
                             
                                <li>
                                    <a href="#0">Electronics</a>
                                </li>
                                <li>
                                    <a href="#0">Real Estate</a>
                                </li>
                               
                                <li>
                                    <a href="#0">Sports & Outdoor</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-lg-3"}>
                        <div className={"footer-widget widget-links"}>
                            <h5 className={"title"}>About Us</h5>
                            <ul className={"links-list"}>
                                <li>
                                    <a href="#0">About E-Gebeya</a>
                                </li>
                                <li>
                                    <Link to='/about/developers'>Developers</Link>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-lg-3"}>
                        <div className={"footer-widget widget-links"}>
                            <h5 className={"title"}>We're Here to Help</h5>
                            <ul className={"links-list"}>
                                <li>
                                    <a href="#0">Your Account</a>
                                </li>
                               
                                <li>
                                    <a href="#0">Contact Us</a>
                                </li>
                                <li>
                                    <a href="#0">Help & FAQ</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={"col-sm-6 col-lg-3"}>
                        <div className={"footer-widget widget-follow"}>
                            <h5 className={"title"}>Follow Us</h5>
                            <ul className={"links-list"}>
                                <li>
                                    <a href="#0"><i className={"fas fa-phone-alt"}></i>+(251)946414257</a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fas fa-blender-phone"}></i>+(251)915734626</a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fas fa-envelope-open-text"}></i>egebeyAR@gmail.com</a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fas fa-map-marker-alt"}></i>Lideta, A.A, Ethiopia.</a>
                                </li>
                            </ul>
                            <ul className={"social-icons"}>
                                <li>
                                    <a href="#0" className={"active"}><i className={"fab fa-facebook-f"}></i></a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fab fa-twitter"}></i></a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fab fa-instagram"}></i></a>
                                </li>
                                <li>
                                    <a href="#0"><i className={"fab fa-linkedin-in"}></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={"footer-bottom"}>
            <div className={"container"}>
                <div className={"copyright-area"}>
                    <div className={"footer-bottom-wrapper"}>
                        <div className={"logo"}>
                            <a href="index.html"><img src="assets/images/logo/logo.png" alt="logo"/></a>
                        </div>
                      
                        <div className={"copyright"}><p>&copy; Copyright 2021 | <a href="#0">E-Gebeya</a> By <a href="#0"></a></p></div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  
    )
}
