import { INIT_STATE } from "../../constant";
import { getSubcomments, getType, updateSubcomments, deleteSubcomments, createSubcomments } from "../actions";

export default function DepartmentsReducers(state = INIT_STATE.comments, action) {
    switch (action.type) {
        case getType(getSubcomments.getSubcommentsRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getSubcomments.getSubcommentsSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getSubcomments.getSubcommentsFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(createSubcomments.createSubcommentsSuccess):
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        case getType(updateSubcomments.updateSubcommentsSuccess):
            return {
                ...state,
                data: state.data.map((subcomment) =>
                    subcomment._id === action.payload._id ? action.payload : subcomment
                ),
            };
        case getType(deleteSubcomments.deleteSubcommentsSuccess):
            const newData = state.data.filter((subcomment) => { return subcomment._id !== action.payload._id });
            return {
                ...state,
                data: newData,
            };
        default:
            return state;
    }
}