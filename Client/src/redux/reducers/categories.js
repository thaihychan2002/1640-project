import { INIT_STATE } from "../../constant";
import { getCategories, getType, updateCategories, deleteCategories, createCategories } from "../actions";

export default function DepartmentsReducers(state = INIT_STATE.departments, action) {
    switch (action.type) {
        case getType(getCategories.getCategoriesRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getCategories.getCategoriesSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getCategories.getCategoriesFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(createCategories.createCategoriesSuccess):
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        case getType(updateCategories.updateCategoriesSuccess):
            return {
                ...state,
                data: state.data.map((category) =>
                    category._id === action.payload._id ? action.payload : category
                ),
            };
        case getType(deleteCategories.deleteCategoriesSuccess):
            return {
                ...state,
                data: state.data.map((category) =>
                    category._id === action.payload._id ? [...state.data,state.data.filter((category)=> category._id=action.payload._id)] : category
                ),
            };
        default:
            return state;
    }
}