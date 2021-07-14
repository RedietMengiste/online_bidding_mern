import { AuctionActionTypes } from './types';

const INITIAL_STATE = {
    fetchAuctionsLoading: false,
    fetchAuctionLoading: false,
    createAuctionLoading: false,
    createAuctionSuccess: false,
    deleteAuctionSuccess: false,
    updateAuctionLoading: false,
    deleteAuctionLoading: false,
    auctions: [],
    auction: {},
    page: 1,
    limit: 4,
    total: 0,
    updateAuctionError: null,
    deleteAuctionError: null,
    createAuctionError: null,
    fetchAuctionError: null,
    fetchAuctionsError: null,
}

const reducer = (state = INITIAL_STATE , action) =>{
    switch(action.type){
        case AuctionActionTypes.AUCTIONS_FETCH_START:
            return {
                ...state,
                fetchAuctionsLoading:true,
                fetchAuctionError:null
            }
        case AuctionActionTypes.AUCTIONS_FETCH_SUCCESS:
            return {
                ...state,
                fetchAuctionsLoading:false,
                auctions : action.payload.auctions,
                page : action.payload.page,
                limit: action.payload.limit,
                total: action.payload.total,
            }

        case AuctionActionTypes.AUCTIONS_FETCH_ERROR:
            return {
                ...state,
                fetchAuctionsLoading: false,
                fetchAuctionsError: action.payload.error,
            };

        case AuctionActionTypes.AUCTION_CREATE_START:
            return{
                ...state,
                createAuctionLoading :true,
                createAuctionError:null
            };
        case AuctionActionTypes.AUCTION_CREATE_SUCCESS:
            return{
                ...state,
                createAuctionLoading:false,
                createAuctionSuccess:true,
                auction : {
                    ...state.auction,
                    [action.payload.id] : action.payload.auction
                }
            };
        case AuctionActionTypes.AUCTION_CREATE_ERROR:
            return{
                ...state,
                createAuctionLoading :false,
                createAuctionError:action.payload.error
            };
        case AuctionActionTypes.CLEAR_AUCTION_CREATE_SUCCESS:
            return{
                ...state,
                createAuctionSuccess:false,
            };
        case AuctionActionTypes.AUCTION_UPDATE_START:
            return{
                ...state,
                updateAuctionLoading : true,
                updateAuctionError: null
            };
        case AuctionActionTypes.AUCTION_UPDATE_SUCCESS:
            return {
                ...state,
                updateAuctionLoading: false,
                auction: {
                ...state.auction,
                [action.payload.id]: action.payload.auction,
                },
            };
        case AuctionActionTypes.AUCTION_UPDATE_ERROR:
            return{
                ...state,
                updateAuctionLoading:false,
                updateAuctionError:action.payload.error
            }

        case AuctionActionTypes.AUCTION_DELETE_START:
            return{
                ...state,
                deleteAuctionLoading : true,
                deleteAuctionError: null
            }
        case AuctionActionTypes.AUCTION_DELETE_SUCCESS:
            return {
                ...state,
                deleteAuctionLoading: false,
                Auction: null,
            };
        case AuctionActionTypes.AUCTION_DELETE_ERROR:
            return{
                ...state,
                deleteAuctionLoading:false,
                deleteAuctionError:action.payload.error
            }
        default:
            return state
    }
}

export default reducer;