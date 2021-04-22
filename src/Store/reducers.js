import * as actionTypes from "./actions";

const initialState = {
  groupBy: "None", //bydefault groupby will be none .
  searchedFor: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGED_FUN:
      return {
        ...state,
        groupBy: action.event,
      };
    case actionTypes.SEARCHED_FUN:
      return {
        ...state,
        searchedFor: action.event,
      };
    default:
      return state;
  }
};

export default reducer;
