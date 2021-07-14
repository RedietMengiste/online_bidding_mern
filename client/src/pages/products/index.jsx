import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Navbar } from '../../components/Navbar'
import  useScript from '../../components/scripts/scripts'
import Addproduct from '../../components/products/add-product';

import {fetchAllProductsSuccessAsync, fetchProductsByOwnerSuccessAsync, fetchProductSuccessAsync} from "../../store/product/action"

import { PlusOutlined } from '@ant-design/icons'
import { Pagination, Spin, Button } from 'antd'


export const ProductPage = () => {
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

    
    const { products, page, limit, total, fetchProductsLoading } = useSelector((state)=>state.product)
    const { user} = useSelector((state)=>state.user)

    useEffect(() => {
       dispatch(fetchAllProductsSuccessAsync(page, limit))
    }, [])

    const handlePaginationChange = (page) => {
        dispatch(fetchAllProductsSuccessAsync(page, limit));
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
        )
    }

    return(
        <>
            <Navbar/>
            {/* bread crumb */}
            <div className={"hero-section style-2"}>
                <div className={"container"}>
                    <ul className={"breadcrumb"}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        
                        <li>
                            <span>products</span>
                        </li>
                    </ul>
                    
                </div>
                <div className={"bg_img hero-bg bottom_center"} style={{backgroundImage:"url(http://pixner.net/sbidu/main/assets/images/banner/hero-bg.png)"}} data-background="http://pixner.net/sbidu/main/assets/images/banner/hero-bg.png"></div>
            </div>
             {/* first three products */}
            
                <section className={"featured-auction-section padding-bottom mt--240 mt-lg--440 pos-rel"}>
                    <div className={"container"}>
                        <div className={"section-header cl-white mw-100 left-style"}>
                            <h3 className={"title"}>Products</h3>
                        </div>
                        <div className={"row justify-content-center mb-30-none"}>

                        
                        {
                            products.slice(products.length > 3 ? products.length - 3:products.length).map((product)=>{
                               return <div className={"col-sm-10 col-md-6 col-lg-4"}>
                                    <div className={"auction-item-2"}>
                                            <div className={"auction-thumb"}>
                                                <Link ><img src={`${process.env.REACT_APP_PRODUCT_IMG_URL}/${product.image}`} alt={product.name}/></Link>
                                            </div>
                                            <div className={"auction-content"}>
                                                <h6 className={"title"}>
                                                    <a href="#0">{product.name}</a>
                                                </h6>
                                                <div className={""}>
                                                    <div className={"bid-amount"}>
                                                        <div className={"icon"}>
                                                            <i className={"flaticon-title"}></i>
                                                        </div>
                                                        <div className={"amount-content"}>
                                                            <div className={"current"}>{product.description}</div>
                                                            <div className={"amount"}>{product.createdAt}</div>
                                                        </div>
                                                    </div>
                                                
                                                </div>
                                                <div className={"countdown-area"}>
                                                    <div className={"countdown"}>
                                                        <div id="bid_counter26">product of </div>
                                                    </div>
                                                    <Link>
                                                        <span className={"total-bids"}>Shop - {  product.shop.name}</span>
                                                    </Link>
                                                </div>
                                                <div className={"text-center"}>
                                                    <Link to='/products' className={"custom-button"}>See Products</Link>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                        
                    
                            })
                        }
                        </div>
                    </div>
                </section>
            
            
        
           
            {/*  list of products*/}
            <div className={"product-auction padding-bottom"}>
                <div className={"container"}>
                    <div className={"product-header mb-40"}>
                        <div className={"product-header-item"}>
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
                        {
                            products.map((product)=>{
                               return <div className={"col-sm-10 col-md-6 col-lg-4"}>
                                    <div className={"auction-item-2"}>
                                            <div className={"auction-thumb"}>
                                                <Link ><img src={`${process.env.REACT_APP_PRODUCT_IMG_URL}/${product.image}`} alt={product.name}/></Link>
                                            </div>
                                            <div className={"auction-content"}>
                                                <h6 className={"title"}>
                                                    <a href="#0">{product.name}</a>
                                                </h6>
                                                <div className={""}>
                                                    <div className={"bid-amount"}>
                                                        <div className={"icon"}>
                                                            <i className={"flaticon-title"}></i>
                                                        </div>
                                                        <div className={"amount-content"}>
                                                            <div className={"current"}>{product.description}</div>
                                                            <div className={"amount"}>{product.createdAt}</div>
                                                        </div>
                                                    </div>
                                                
                                                </div>
                                                <div className={"countdown-area"}>
                                                    <div className={"countdown"}>
                                                        <div id="bid_counter26">Product of </div>
                                                    </div>
                                                    <Link>
                                                        <span className={"total-bids"}>Shop - {  product.shop.name}</span>
                                                    </Link>
                                                </div>
                                                <div className={"text-center"}>
                                                    <a href="#0" className={"custom-button"}>See Products</a>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                        
                    
                            })
                        }
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
            <Addproduct isOpen={isModalOpen} onClose={()=>setModal(false)}/>
    </>

    )
}
