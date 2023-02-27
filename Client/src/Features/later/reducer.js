const {
  Later_Load,
  Later_Success,
  Later_Error,
  Later_Adding,
  Later_Updating,
  Later_Deleting,
} = require("./actionType");

const init = {
  load: false,
  laterData: [],
  error: false,
};

export const laterReducer = (state = init, action) => {
  switch (action.type) {
    case Later_Load: {
      return { ...state, load: true };
    }
    case Later_Success: {
      return { ...state, laterData: action.payload };
    }
    case Later_Adding: {
      return state;
    }
    case Later_Updating: {
      return state;
    }
    case Later_Deleting: {
      return state;
    }
    case Later_Error: {
      return { ...state, error: true };
    }
    default:
      return state;
  }
};
