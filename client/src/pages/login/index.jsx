import { useEffect } from "react";
import { Alert } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../store/user/action";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import useScript from "../../components/scripts/scripts";

const Login = () => {
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
  const { loginLoading, loginError, token } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [token]);

  const handleSubmit = (event) => {
   event.preventDefault();
    dispatch(loginAsync(event.target.email.value, event.target.password.value));
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
                    <span>Sign In</span>
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
                    {loginError && loginError.response ? (
          <Alert
            message={loginError.response.data.message}
            type="error"
            closable
            style={{
              marginTop: 5,
              marginBottom: 5,
            }}
          />
        ) : null}
    </div>
            
                <form className={"login-form"}onSubmit={handleSubmit}>
                    <div className={"form-group mb-30"}>
                        <label for="login-email"><i className={"far fa-envelope"}></i></label>
                        <input name='email' type="text" id="login-email" placeholder="Email Address" required/>
                    </div>
                    <div className={"form-group"}>
                        <label for="login-pass"><i className={"fas fa-lock"}></i></label>
                        <input  name='password' type="password" id="login-pass" placeholder="Password" required/>
                        <span className={"pass-type"}><i className={"fas fa-eye"}></i></span>
                    </div>
                   
                    <div className={"form-group mb-0"}>
                        <button type="submit" className={"custom-button"} disabled={loginLoading} loading={loginLoading}
                >Login</button>
                    </div>
                </form>
            </div>
            <div className={"right-side cl-white"} style={{backgroundColor:'#6C63FF'}}>
                <div className={"section-header mb-0"}>
                  <h3 className={"title mt-0"}>New Here?</h3>
                        <p>Create an account and sign in.</p>
                        <Link to='/signup' class="custom-button transparent">Sign Up</Link>
                </div>
            </div>
        </div>
    </div>
</section>
<Footer/>
    </>
  );
};
export default Login;
