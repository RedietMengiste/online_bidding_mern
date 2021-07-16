import { Button } from "antd";
import { Link } from "react-router-dom";
const NotFound = () => {
 return(
  <>
  <div class="error-section padding-top padding-bottom bg_img" data-background="assets/images/error-bg.png">
        <div class="container">
            <div class="error-wrapper">
                <div class="error-thumb">
                    <img src="/assets/images/error.svg" alt="error"/>
                </div>
                <div>
                  <h3 className={'cate'} style={{color:'#442DB9'}}>
You are alone here!
                  </h3>
                </div>
                <Button className={'custom-button m-4'}>
        <Link to="/">Back Home</Link>
      </Button>
            </div>
        </div>
    </div>
      
    
  </>
  );
 }
export default NotFound;
