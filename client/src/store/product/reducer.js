import { ProductActionTypes } from './types';

const INITIAL_STATE = {
    fetchProductsLoading: false,
    fetchProductLoading: false,
    createProductLoading: false,
    createProductSuccess: false,
    deleteProductSuccess: false,
    updateProductLoading: false,
    deleteProductLoading: false,
    products: [],
    product: {},
    page: 1,
    limit: 4,
    total: 0,
    updateProductError: null,
    deleteProductError: null,
    createProductError: null,
    fetchProductError: null,
    fetchProductsError: null,
}

const reducer = (state = INITIAL_STATE , action) =>{
    switch(action.type){
        case ProductActionTypes.PRODUCTS_FETCH_START:
            return {
                ...state,
                fetchProductsLoading:true,
                fetchProductError:null
            }
        case ProductActionTypes.PRODUCTS_FETCH_SUCCESS:
            return {
                ...state,
                fetchProductsLoading:false,
                products : action.payload.products,
                page : action.payload.page,
                limit: action.payload.limit,
                total: action.payload.total,
            }

        case ProductActionTypes.PRODUCTS_FETCH_ERROR:
            return {
                ...state,
                fetchProductsLoading: false,
                fetchProductsError: action.payload.error,
            };

        case ProductActionTypes.PRODUCT_CREATE_START:
            return{
                ...state,
                createProductLoading :true,
                createProductError:null
            };
        case ProductActionTypes.PRODUCT_CREATE_SUCCESS:
            return{
                ...state,
                createProductLoading:false,
                createProductSuccess:true,
                product : {
                    ...state.product,
                    [action.payload.id] : action.payload.product
                }
            };
        case ProductActionTypes.PRODUCT_CREATE_ERROR:
            return{
                ...state,
                createProductLoading :false,
                createProductError:action.payload.error
            };
        case ProductActionTypes.CLEAR_PRODUCT_CREATE_SUCCESS:
            return{
                ...state,
                createProductSuccess:false,
            };
        case ProductActionTypes.PRODUCT_UPDATE_START:
            return{
                ...state,
                updateProductLoading : true,
                updateProductError: null
            };
        case ProductActionTypes.PRODUCT_UPDATE_SUCCESS:
            return {
                ...state,
                updateProductLoading: false,
                product: {
                ...state.product,
                [action.payload.id]: action.payload.product,
                },
            };
        case ProductActionTypes.PRODUCT_UPDATE_ERROR:
            return{
                ...state,
                updateProductLoading:false,
                updateProductError:action.payload.error
            }

        case ProductActionTypes.PRODUCT_DELETE_START:
            return{
                ...state,
                deleteProductLoading : true,
                deleteProductError: null
            }
        case ProductActionTypes.PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                deleteProductLoading: false,
                Product: null,
            };
        case ProductActionTypes.PRODUCT_DELETE_ERROR:
            return{
                ...state,
                deleteProductLoading:false,
                deleteProductError:action.payload.error
            }
        default:
            return state
    }
}

export default reducer;