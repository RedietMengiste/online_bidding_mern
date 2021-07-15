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
            <div className={"container-fluid"}>
                <div className={"header-wrapper"}>
                    <div className={"logo"}>
                        <Link >
                            <img src={logo}style={{marginLeft:'50px'}} alt="logo"/>
                        </Link>
                    </div>
                    <ul className={"menu"} style={{marginRight:'50px'}}>
                    {/* <form className={"search-form"}>
                        <input type="text" placeholder="Search for brand, model...."/>
                        <button type="submit"><i className={"fas fa-search"}></i></button>
                    </form>
                    <div className={"search-bar d-md-none"}>
                        <Link href="#0"><i className={"fas fa-search"}></i></Link>
                    </div> */}
                        <li>
                            <Link to='/' >Home</Link>

                        </li>
                        <li>
                            <Link to='/shops'>Shops</Link>
                        </li>
                        <li>
                            <Link to= '/auctions'>Auction</Link>
                        </li>
                     
                        <li>
                            <Link to='/about'> About</Link>
                        </li>
                    
                   
                    <div className={"header-bar d-lg-none"}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    

                    {
                        token && (
                        <li>
                            {
                            user.seller && (<>
                            <Link to={'/shops/'+user._id} className={"user-button"}>My shops</Link>
                            <Link to={'/auctions/'+user._id} className={"user-button"}>My auctions</Link>
                            </>)
                            }
                            
                            <Link>{user.firstName}&nbsp;{user.lastName}</Link>
                            
                           <Link className={"normal-button"} style={{width:'120px',height:'50px', paddingTop:'2px' ,paddingLeft:'35px'}} onClick={onLogout}>logout</Link></li>
                        )

                    }
{
                        !token && (
                        <li>
                        
                            <Link to="/login">Sign in</Link>
                            <Link to="/signup">Sign up</Link></li>
                        )
                        
                    }
                    
                    {/* <ul className={"cart-button-area"}>
                        <li>
                            <Link className={"cart-button"}><i className={"flaticon-shopping-basket"}></i><span className={"amount"}>08</span></Link>
                        </li>                        
                        <li>
                            <Link className={"user-button"}><i className={"flaticon-user"}></i></Link>
                        </li>                        
                    </ul> */}
                     
                    </ul>
                </div>
            </div>
        </div>
   
  
    </header>
  
    )
}
