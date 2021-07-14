import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import shopReducer from "./shop/reducer";
import productReducer from "./product/reducer";
import auctionReducer from "./auction/reducer";

const rootReducer = combineReducers({
    user: userReducer,
    shop: shopReducer,
    product: productReducer,
    auction: auctionReducer,
});

export default rootReducer;