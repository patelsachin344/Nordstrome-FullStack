import {
  GetErrorData,
  GetLoadData,
  GetOneSuccessData,
  GetSuccessData,
} from "./action";

const initialState = {
  loading: false,
  error: false,
  products: [],
  product: {},
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GetSuccessData: {
      return {
        ...state,
        loading: false,
        error: false,
        products: payload,
      };
    }
    case GetOneSuccessData: {
      return {
        ...state,
        loading: false,
        error: false,
        product: payload,
      };
    }

    case GetLoadData: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case GetErrorData: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    default: {
      return state;
    }
  }
};
