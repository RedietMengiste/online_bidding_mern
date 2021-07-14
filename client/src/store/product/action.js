import { ProductActionTypes } from "./types";
import axios from "axios";

/**
 * fetch all products
 * @returns 
 */
export const fetchAllProductsStart = () => ({
    type: ProductActionTypes.PRODUCTS_FETCH_START
});

export const fetchAllProductsSuccess = (products, page, limit, total) => ({
    type: ProductActionTypes.PRODUCTS_FETCH_SUCCESS,
    payload:{
        products,
        page,
        limit,
        total,
    },
});

export const fetchAllProductsError = (error) => ({
    type: ProductActionTypes.PRODUCTS_FETCH_ERROR,
    payload:{
      error,
    },
});


/**
 * fetch product
 * @returns 
 */
export const fetchProductStart = () => ({
    type: ProductActionTypes.PRODUCT_FETCH_ALL_START
});

export const fetchProductSuccess = (product) => ({
    type: ProductActionTypes.PRODUCT_FETCH_ALL_SUCCESS,
    payload:{
        product,
    },
});

export const fetchProductError = (error) => ({
    type: ProductActionTypes.PRODUCT_FETCH_ALL_ERROR,
    payload:{
      error,
    },
});


/**
 * create product
 * @returns 
 */
 export const createProductStart = () => ({
    type: ProductActionTypes.PRODUCT_CREATE_START
});

export const createProductSuccess = (product) => ({
    type: ProductActionTypes.PRODUCT_CREATE_SUCCESS,
    payload:{
        product,
    },
});

export const createProductError = (error) => ({
    type: ProductActionTypes.PRODUCT_CREATE_ERROR,
    payload:{
      error,
    },
});

export const clearCreateProductSuccess = () => ({
    type: ProductActionTypes.CLEAR_PRODUCT_CREATE_SUCCESS,
  });


/**
 * update shop
 * @returns 
 */
 export const updateProductStart = () => ({
    type: ProductActionTypes.PRODUCT_UPDATE_START
});

export const updateProductSuccess = (id,product) => ({
    type: ProductActionTypes.PRODUCT_UPDATE_SUCCESS,
    payload:{
        id,
        product,
    },
});

export const updateProductError = (error) => ({
    type: ProductActionTypes.PRODUCT_UPDATE_ERROR,
    payload:{
      error,
    },
});



/**
 * Delete shop
 * @returns 
 */
 export const deleteProductStart = () => ({
    type: ProductActionTypes.PRODUCT_DELETE_START
});

export const deleteProductSuccess = (id,product) => ({
    type: ProductActionTypes.PRODUCT_DELETE_SUCCESS,
    payload:{
        id,
        product,
    },
});

export const deleteProductError = (error) => ({
    type: ProductActionTypes.PRODUCT_DELETE_ERROR,
    payload:{
      error,
    },
});

// to do asigning id
/**
 * async functions
 * @param {*} shop 
 * @returns 
 */
export const createProductSuccessAsync = (product, shopId) => {
    return async (dispatch,getState)=> {
        const{
            user:{token},
        }=getState();
        let globalResponse={}
        try{
            dispatch(createProductStart());
            const response=await axios.post(
                `${process.env.REACT_APP_API_URL}/products/by/${shopId}`,product,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            globalResponse = response.data.product
            dispatch(createProductSuccess(response.data.product))
            
        }
        catch(error){
            
            dispatch(createProductSuccess(globalResponse));
        }
        
    }
}

export const updateProductSuccessAsync = (id,form) => {
    return async (dispatch,getState)=> {
        const{
            user:{token},
        }=getState();
        try{
            dispatch(updateProductStart());
            const response=await axios.put(
                `${process.env.REACT_APP_API_URL}/product/${id}`,form,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                }
            );
            dispatch(updateProductSuccess(id,response.data.product))
        }
        catch(error){
            dispatch(updateProductError(error));
        }
        
    }
}

export const deleteProductSuccessAsync = (id) => {
    return async (dispatch,getState)=> {
        const{
            user:{token},
        }=getState();
        try{
            dispatch(deleteProductStart());
            const response=await axios.put(
                `${process.env.REACT_APP_API_URL}/product/${id}`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                }
            );
            dispatch(deleteProductSuccess(id,response.data.product))
        }
        catch(error){
            dispatch(deleteProductError(error));
        }
        
    }
}

export const fetchProductSuccessAsync = (id) => {
    return async (dispatch,getState)=> {
        const{
            user:{token},
        }=getState();
        try{
            dispatch(fetchProductStart());
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/product/${id}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            dispatch(fetchProductSuccess(response.data.product))
        }
        catch(error){
            dispatch(fetchProductError(error));
        }
    }
}

/**
 * 
 * @param {*} page 
 * @param {*} limit 
 * @returns 
 */
export const fetchAllProductsSuccessAsync = (page,limit) =>{
    return async(dispatch, getState) => {
        const{
            user:{token},
        }=getState();
        try{
            dispatch(fetchAllProductsStart());
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/products`,
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
            dispatch(fetchAllProductsSuccess(response.data.result.docs,response.data.result.page,response.data.result.limit,response.data.result.total))
        }
        catch(error){
            dispatch(fetchAllProductsError(error));
        }
    }
}

export const fetchProductsByShopSuccessAsync = (page,limit, shopId) =>{
    return async(dispatch, getState) => {
        const{
            user:{token},
        }=getState();
        try{
            dispatch(fetchAllProductsStart());
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/products/by/${shopId}`,
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
            dispatch(fetchAllProductsSuccess(response.data.result.docs,response.data.result.page,response.data.result.limit,response.data.result.total))
        }
        catch(error){
            dispatch(fetchAllProductsError(error));
        }
    }
}
