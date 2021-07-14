import {ShopActionTypes} from './types';

const INITIAL_STATE = {
    fetchShopsLoading: false,
    fetchShopLoading: false,
    createShopLoading: false,
    createShopSuccess: false,
    deleteShopSuccess: false,
    updateShopLoading: false,
    deleteShopLoading: false,
    shops: [],
    shop: {},
    page: 1,
    limit: 4,
    total: 0,
    updateShopError: null,
    deleteShopError: null,
    createShopError: null,
    fetchShopError: null,
    fetchShopsError: null,
}

const reducer = (state = INITIAL_STATE , action) =>{
    switch(action.type){
        case ShopActionTypes.SHOP_FETCH_START:
            return {
                ...state,
                fetchShopsLoading:true,
                fetchShopError:null
            }
        case ShopActionTypes.SHOPS_FETCH_SUCCESS:
            return {
                ...state,
                fetchShopLoading:false,
                shops : action.payload.shops,
                page : action.payload.page,
                limit: action.payload.limit,
                total: action.payload.total,
            }

        case ShopActionTypes.SHOPS_FETCH_ERROR:
            return {
                ...state,
                fetchShopsLoading: false,
                fetchShopsError: action.payload.error,
            };

        case ShopActionTypes.SHOP_CREATE_START:
            return{
                ...state,
                createShopLoading :true,
                createShopError:null
            };
        case ShopActionTypes.SHOP_CREATE_SUCCESS:
            return{
                ...state,
                createShopLoading:false,
                createShopSuccess:true,
                shop : {
                    ...state.shop,
                    [action.payload.id] : action.payload.shop
                }
            };
        case ShopActionTypes.SHOP_CREATE_ERROR:
            return{
                ...state,
                createShopLoading :false,
                createShopError:action.payload.error
            };
        case ShopActionTypes.CLEAR_SHOP_CREATE_SUCCESS:
            return{
                ...state,
                createShopSuccess:false,
            };
        case ShopActionTypes.SHOP_UPDATE_START:
            return{
                ...state,
                updateShopLoading : true,
                updateShopError: null
            };
        case ShopActionTypes.SHOP_UPDATE_SUCCESS:
            return {
                ...state,
                updateShopLoading: false,
                shop: {
                ...state.shop,
                [action.payload.id]: action.payload.shop,
                },
            };
        case ShopActionTypes.SHOP_UPDATE_ERROR:
            return{
                ...state,
                updateShopLoading:false,
                updateShopError:action.payload.error
            }

        case ShopActionTypes.SHOP_DELETE_START:
            return{
                ...state,
                deleteShopLoading : true,
                deleteShopError: null
            }
        case ShopActionTypes.SHOP_DELETE_SUCCESS:
            return {
                ...state,
                deleteShopLoading: false,
                shop: null,
            };
        case ShopActionTypes.SHOP_DELETE_ERROR:
            return{
                ...state,
                deleteShopLoading:false,
                deleteShopError:action.payload.error
            }
        default:
            return state
    }
}

export default reducer;