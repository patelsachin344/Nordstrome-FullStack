const {
  Cart_Load,
  Cart_Success,
  Cart_Error,
  Cart_Adding,
  Cart_Updating,
  Cart_Deleting,
} = require("./actionType");

const init = {
  load: false,
  cartData: [],
  error: false,
};

export const cartReducer = (state = init, action) => {
  switch (action.type) {
    case Cart_Load: {
      return { ...state, load: true };
    }
    case Cart_Success: {
      return { ...state, cartData: action.payload };
    }
    case Cart_Adding: {
      return state;
    }
    case Cart_Updating: {
      return state;
    }
    case Cart_Deleting: {
      return state;
    }
    case Cart_Error: {
      return { ...state, error: true };
    }
    default:
      return state;
  }
};
