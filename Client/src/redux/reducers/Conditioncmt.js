import { INIT_STATE } from "../../constant";
import { getConditionCmts, getType } from "../actions";

export default function postsReducers(state = INIT_STATE.ConditionCmt, action) {
  switch (action.type) {
    case getType(getConditionCmts.getCmtsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getConditionCmts.getCmtsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getConditionCmts.getCmtsFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}