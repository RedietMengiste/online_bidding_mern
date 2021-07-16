import { ShopActionTypes } from "./types";
import axios from "axios";

/**
 * fetch all shops
 * @returns 
 */
export const fetchAllShopsStart = () => ({
    type: ShopActionTypes.SHOPS_FETCH_START
});

export const fetchAllShopsSuccess = (shops, page, limit, total) => ({
    type: ShopActionTypes.SHOPS_FETCH_SUCCESS,
    payload:{
        shops,
        page,
        limit,
        total,
    },
});

export const fetchAllShopsError = (error) => ({
    type: ShopActionTypes.SHOPS_FETCH_ERROR,
    payload:{
      error,
    },
});


/**
 * fetch shop
 * @returns 
 */
export const fetchShopStart = () => ({
    type: ShopActionTypes.SHOP_FETCH_START
});

export const fetchShopSuccess = (shop) => ({
    type: ShopActionTypes.SHOP_FETCH_SUCCESS,
    payload:{
        shop,
    },
});

export const fetchShopError = (error) => ({
    type: ShopActionTypes.SHOP_FETCH_ERROR,
    payload:{
      error,
    },
});


/**
 * create shop
 * @returns 
 */
 export const createShopStart = () => ({
    type: ShopActionTypes.SHOP_CREATE_START
});

export const createShopSuccess = (shop) => ({
    type: ShopActionTypes.SHOP_CREATE_SUCCESS,
    payload:{
        shop,
    },
});

export const createShopError = (error) => ({
    type: ShopActionTypes.SHOP_CREATE_ERROR,
    payload:{
      error,
    },
});


export const clearCreateShopSuccess = () => ({
    type: ShopActionTypes.CLEAR_SHOP_CREATE_SUCCESS,
  });

/**
 * update shop
 * @returns 
 */
 export const updateShopStart = () => ({
    type: ShopActionTypes.SHOP_UPDATE_START
});

export const updateShopSuccess = (id, shop) => ({
    type: ShopActionTypes.SHOP_UPDATE_SUCCESS,
    payload:{
        id,
        shop,
    },
});

export const updateShopError = (error) => ({
    type: ShopActionTypes.SHOP_UPDATE_ERROR,
    payload:{
      error,
    },
});



/**
 * Delete shop
 * @returns 
 */
 export const deleteShopStart = () => ({
    type: ShopActionTypes.SHOP_DELETE_START
});

export const deleteShopSuccess = (id,shop) => ({
    type: ShopActionTypes.SHOP_DELETE_SUCCESS,
    payload:{
        id,
        shop,
    },
});

export const deleteShopError = (error) => ({
    type: ShopActionTypes.SHOP_DELETE_ERROR,
    payload:{
      error,
    },
});

// create shop async
export const createShopSuccessAsync = (shop) => {
    return async (dispatch,getState)=> {
        const{
            user:{token, user},
        }=getState();
        try{
            dispatch(createShopStart());
            const response=await axios.post(
                `${process.env.REACT_APP_API_URL}/shops/by/${user._id}`,shop,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            dispatch(createShopSuccess(response.data.shop))
            
        }
        catch(error){
            dispatch(createShopError(error));
        }
        
    }
}

export const updateShopSuccessAsync = (id,form) => {
    return async (dispatch,getState)=> {
        const{
            user:{token},
        }=getState();
        try{
            dispatch(updateShopStart());
            const response=await axios.put(
                `${process.env.REACT_APP_API_URL}/shops/${id}`,form,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                }
            );
            dispatch(updateShopSuccess(id,response.data.shop))
        }
        catch(error){
            dispatch(updateShopError(error));
        }
        
    }
}

export const deleteShopSuccessAsync = (id) => {
    return async (dispatch,getState)=> {
        const{
            user:{token},
        }=getState();
        try{
            dispatch(deleteShopStart());
            const response=await axios.delete(
                `${process.env.REACT_APP_API_URL}/shops/${id}`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                }
            );
            dispatch(deleteShopSuccess(id,response.data.shop))
        }
        catch(error){
            dispatch(deleteShopError(error));
        }
        
    }
}

export const fetchShopSuccessAsync = (id) => {
    return async (dispatch,getState)=> {
        const{
            user:{token},
        }=getState();
        try{
            dispatch(fetchShopStart());
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/shops/${id}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            dispatch(fetchShopSuccess(response.data.shop))
        }
        catch(error){
            dispatch(fetchShopError(error));
        }
    }
}

/**
 * 
 * @param {*} page 
 * @param {*} limit 
 * @returns 
 */
export const fetchAllShopsSuccessAsync = (page,limit) =>{
    return async(dispatch, getState) => {
        const{
            user:{token},
        }=getState();
        try{
            dispatch(fetchAllShopsStart());
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/shops`,
                {
                    params:{
                        page,
                        limit,
                    },
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            dispatch(fetchAllShopsSuccess(response.data.result.docs,response.data.result.page,response.data.result.limit,response.data.result.total))
        }
        catch(error){
            dispatch(fetchAllShopsError(error));
        }
    }
}

export const fetchShopsByOwnerSuccessAsync = (page,limit) =>{
    return async(dispatch, getState) => {
        const{
            user:{token, user},
        }=getState();
        try{
            dispatch(fetchAllShopsStart());
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/shops/by/${user._id}`,
                {
                    params:{
                        page,
                        limit,
                    },
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            dispatch(fetchAllShopsSuccess(response.data.result.docs,response.data.result.page,response.data.result.limit,response.data.result.total))
        }
        catch(error){
            dispatch(fetchAllShopsError(error));
        }
    }
}

