import { AuctionActionTypes } from "./types";
import axios from "axios";

/**
 * fetch all auctions
 * @returns
 */
export const fetchAllAuctionsStart = () => ({
  type: AuctionActionTypes.AUCTIONS_FETCH_START,
});

export const fetchAllAuctionsSuccess = (auctions, page, limit, total) => ({
  type: AuctionActionTypes.AUCTIONS_FETCH_SUCCESS,
  payload: {
    auctions,
    page,
    limit,
    total,
  },
});

export const fetchAllAuctionsError = (error) => ({
  type: AuctionActionTypes.AUCTIONS_FETCH_ERROR,
  payload: {
    error,
  },
});

/**
 * fetch auction
 * @returns
 */
export const fetchAuctionStart = () => ({
  type: AuctionActionTypes.AUCTION_FETCH_START,
});

export const fetchAuctionSuccess = (auction) => ({
  type: AuctionActionTypes.AUCTION_FETCH_SUCCESS,
  payload: {
    auction,
  },
});

export const fetchAuctionError = (error) => ({
  type: AuctionActionTypes.AUCTION_FETCH_ERROR,
  payload: {
    error,
  },
});

/**
 * create auction
 * @returns
 */
export const createAuctionStart = () => ({
  type: AuctionActionTypes.AUCTION_CREATE_START,
});

export const createAuctionSuccess = (auction) => ({
  type: AuctionActionTypes.AUCTION_CREATE_SUCCESS,
  payload: {
    auction,
  },
});

export const createAuctionError = (error) => ({
  type: AuctionActionTypes.AUCTION_CREATE_ERROR,
  payload: {
    error,
  },
});

export const clearCreateAuctionSuccess = () => ({
  type: AuctionActionTypes.CLEAR_AUCTION_CREATE_SUCCESS,
});

/**
 * update shop
 * @returns
 */
export const updateAuctionStart = () => ({
  type: AuctionActionTypes.AUCTION_UPDATE_START,
});

export const updateAuctionSuccess = (id, auction) => ({
  type: AuctionActionTypes.AUCTION_UPDATE_SUCCESS,
  payload: {
    id,
    auction,
  },
});

export const updateAuctionError = (error) => ({
  type: AuctionActionTypes.AUCTION_UPDATE_ERROR,
  payload: {
    error,
  },
});

/**
 * Delete shop
 * @returns
 */
export const deleteAuctionStart = () => ({
  type: AuctionActionTypes.AUCTION_DELETE_START,
});

export const deleteAuctionSuccess = (id, auction) => ({
  type: AuctionActionTypes.AUCTION_DELETE_SUCCESS,
  payload: {
    id,
    auction,
  },
});

export const deleteAuctionError = (error) => ({
  type: AuctionActionTypes.AUCTION_DELETE_ERROR,
  payload: {
    error,
  },
});

// to do asigning id
/**
 * async functions
 * @param {*} shop
 * @returns
 */
export const createAuctionSuccessAsync = (auction, userId) => {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    let globalResponse = {};
    try {
      dispatch(createAuctionStart());
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auctions/by/${userId}`,
        auction,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      globalResponse = response.data.auction;
      dispatch(createAuctionSuccess(response.data.auction));
    } catch (error) {
      dispatch(createAuctionSuccess(globalResponse));
    }
  };
};

export const updateAuctionSuccessAsync = (id, form) => {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    try {
      dispatch(updateAuctionStart());
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/auction/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateAuctionSuccess(id, response.data.auction));
    } catch (error) {
      dispatch(updateAuctionError(error));
    }
  };
};

export const deleteAuctionSuccessAsync = (id) => {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    try {
      dispatch(deleteAuctionStart());
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/auction/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(deleteAuctionSuccess(id, response.data.auction));
    } catch (error) {
      dispatch(deleteAuctionError(error));
    }
  };
};

export const fetchAuctionSuccessAsync = (id) => {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    try {
      dispatch(fetchAuctionStart());
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auctions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchAuctionSuccess(response.data.auction));
    } catch (error) {
      dispatch(fetchAuctionError(error));
    }
  };
};

/**
 *
 * @param {*} page
 * @param {*} limit
 * @returns
 */
export const fetchAllAuctionsSuccessAsync = (page, limit) => {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    try {
      dispatch(fetchAllAuctionsStart());
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auctions/any/allAuctions`,
        {
          params: {
            page,
            limit,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        fetchAllAuctionsSuccess(
          response.data.result.docs,
          response.data.result.page,
          response.data.result.limit,
          response.data.result.total
        )
      );
    } catch (error) {
      dispatch(fetchAllAuctionsError(error));
    }
  };
};

export const fetchAuctionsByUserSuccessAsync = (page, limit, userId) => {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    try {
      dispatch(fetchAllAuctionsStart());
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auctions/by/${userId}`,
        {
          params: {
            page,
            limit,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        fetchAllAuctionsSuccess(
          response.data.result.docs,
          response.data.result.page,
          response.data.result.limit,
          response.data.result.total
        )
      );
    } catch (error) {
      dispatch(fetchAllAuctionsError(error));
    }
  };
};
