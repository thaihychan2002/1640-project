import { INIT_STATE } from "../../constant";
import { getActionsLog, getType, createActionsLog, updateActionsLog, filterActionsLog } from "../actions";

export default function ActionsLogReducers(state = INIT_STATE.actionslog, action) {
    switch (action.type) {
        case getType(getActionsLog.getActionsLogRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getActionsLog.getActionsLogSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getActionsLog.getActionsLogFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(createActionsLog.createActionsLogSuccess):
            return {
                ...state,
                data: action.payload,
            };
        case getType(updateActionsLog.updateActionsLogSuccess):
            return {
                ...state,
                data: state.data.map((updatedaction) =>
                updatedaction._id === action.payload._id ? action.payload : updatedaction
                ),
            };
        case getType(filterActionsLog.filterActionsLogSuccess):
            return {
                ...state,
                data: action.payload,
            };
        case getType(filterActionsLog.filterActionsLogRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(filterActionsLog.filterActionsLogFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}