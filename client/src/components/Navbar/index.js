import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { logOut } from '../../store/user/action'
import logo from "../../assets/images/logo/logo.png"

export const Navbar = () => {

    const dispatch= useDispatch();
    const {user,token}= useSelector(state => state.user);
    
    const onLogout = () =>{
        dispatch(logOut());
    }

    return (
    
    <header>
        
        <div className={"header-bottom"}>
            <div className={"container"}>
                <div className={"header-wrapper"}>
                    <div className={"logo"}>
                        <Link >
                            <img src={logo} alt="logo"/>
                        </Link>
                    </div>
                    <ul className={"menu ml-auto"}>
                        <li>
                            <Link >Home</Link>

                        </li>
                        <li>
                            <Link to='/shops'>Shops</Link>
                        </li>
                        <li>
                            <Link >Auction</Link>
                        </li>
                     
                        <li>
                            <Link >Contact</Link>
                        </li>
                    </ul>
                    <form className={"search-form"}>
                        <input type="text" placeholder="Search for brand, model...."/>
                        <button type="submit"><i className={"fas fa-search"}></i></button>
                    </form>
                    <div className={"search-bar d-md-none"}>
                        <Link href="#0"><i className={"fas fa-search"}></i></Link>
                    </div>
                    <div className={"header-bar d-lg-none"}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    {
                        token && (
                        <span>{
                            user.seller && (<>
                            <Link to={'/shops/'+user._id} className={"user-button"}><i className={"flaticon-basket"}></i>My shops</Link>
                            <Link to={'/auctions/'+user._id} className={"user-button"}><i className={"flaticon-user"}></i>My auctions</Link>
                            </>)
                            }
                            <Link>{user.firstName + user.lastName}</Link>
                            <button className={"custom-button yellow btn-sm"} onClick={onLogout}>logout</button></span>
                        )

                    }
{
                        !token && (
                        <span>
                            <Link to="/login">Sign in</Link>
                            <Link to="/signup">Sign up</Link></span>
                        )
                        
                    }
                    <ul className={"cart-button-area"}>
                        <li>
                            <Link className={"cart-button"}><i className={"flaticon-shopping-basket"}></i><span className={"amount"}>08</span></Link>
                        </li>                        
                        <li>
                            <Link className={"user-button"}><i className={"flaticon-user"}></i></Link>
                        </li>                        
                    </ul>
                </div>
            </div>
        </div>
   
  
    </header>
  
    )
}
