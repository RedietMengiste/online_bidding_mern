import { useEffect } from "react";
import { Card, Form, Input, Button, Typography, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signUpAsync } from "../../store/user/action";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import useScript from "../../components/scripts/scripts";

const SignUp = () => {

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
    
  const dispatch = useDispatch();
  const history = useHistory();
  const { signUpLoading, signUpError, token } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signUpAsync( event.target.firstName.value,  event.target.lastName.value,  event.target.email.value,  event.target.phonenumber.value,  event.target.password.value));
    event.target.reset();
  };

  return (
    <>
    <Navbar/>
  
    <a href="#0" className={"scrollToTop"}><i className={"fas fa-angle-up"}></i></a>

    <div className={"hero-section"}>
        <div className={"container"}>
            <ul className={"breadcrumb"}>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                
                <li>
                    <span>Sign Up</span>
                </li>
            </ul>
        </div>
        <div className={"bg_img hero-bg bottom_center"} data-background="assets/images/banner/hero-bg.png" style={{backgroundImage :'url(http://pixner.net/sbidu/main/assets/images/banner/hero-bg.png)'}}></div>
    </div>
    <section className={"account-section padding-bottom"}>
    <div className={"container"}>
        <div className={"account-wrapper mt--100 mt-lg--440"}>
            <div className={"left-side"}>
                <div className={"section-header"}>
                    <h2 className={"title"}>HI, THERE</h2>
                    <p>You can create an account here.</p>
                    {signUpError && signUpError.response ? (
          <Alert
            message={signUpError.response.data.message}
            type="error"
            closable
            style={{
              marginTop: 5,
              marginBottom: 5,
            }}
          />
        ) : null}
                </div>
            
                <form className={"login-form"} onSubmit={handleSubmit}>
                <div className={"form-group mb-30"}>
                        <label for="First Name"><i className={"far fa-user"}></i></label>
                        <input name='firstName' type="text" id="first-name" placeholder="First Name" required/>
                    </div>
                    <div className={"form-group mb-30"}>
                        <label for="Last Name"><i className={"far fa-user"}></i></label>
                        <input name='lastName' type="text" id="last-name" placeholder="Last Name" required/>
                    </div>
                    <div className={"form-group mb-30"}>
                        <label for="login-email"><i className={"far fa-envelope"}></i></label>
                        <input name='email' type="email"  placeholder="Email Address" required/>
                    </div>
                    <div className={"form-group mb-30"}>
                        <label for="login-email"><i className={"fas fa-phone"}></i></label>
                        <input name='phonenumber' type="phone" id="phone-number" placeholder="Phone Number" required/>
                    </div>
                    <div className={"form-group"}>
                        <label for="login-pass"><i className={"fas fa-lock"}></i></label>
                        <input name= 'password' type="password" placeholder="Password" required/>
                        <span className={"pass-type"}><i className={"fas fa-eye"}></i></span>
                    </div>
                   
                    <div className={"form-group mb-0"}>
                        <button type="submit" className={"custom-button"}disabled={signUpLoading}
                loading={signUpLoading}>Sign Up</button>
                    </div>
                </form>
            </div>
            <div className={"right-side cl-white"} style={{backgroundColor:'#6C63FF'}}>
                <div className={"section-header mb-0"}>
                  <h3 className={"title mt-0"}>ALREADY HAVE AN ACCOUNT?</h3>
                        <p>Log in and go to your Dashboard.</p>
                        <Link to='/login' class="custom-button transparent">Login</Link>
                </div>
            </div>
        </div>
    </div>
</section>

  
    <Footer/>
    </>
  );
};
export default SignUp;
