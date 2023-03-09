import { INIT_STATE } from "../../constant";
import { getComments, getType, updateComments, deleteComments, createComments, getConditionCmts } from "../actions";

export default function DepartmentsReducers(state = INIT_STATE.comments, action) {
    switch (action.type) {
        case getType(getComments.getCommentsRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getComments.getCommentsSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getComments.getCommentsFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(createComments.createCommentsSuccess):
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        case getType(updateComments.updateCommentsSuccess):
            return {
                ...state,
                data: state.data.map((comment) =>
                    comment._id === action.payload._id ? action.payload : comment
                ),
            };
        case getType(deleteComments.deleteCommentsSuccess):
            const newData = state.data.filter((comment) => { return comment._id !== action.payload._id });
            return {
                ...state,
                data: newData,
            };
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